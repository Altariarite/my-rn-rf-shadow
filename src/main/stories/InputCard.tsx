import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-ui-datepicker';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

type InputCardProps = {
    accountName: string;
    remainingBalance: number;
    onCalendarPress: () => void;
    currentDate: string;
    showDatePicker: boolean;
    selectedDate: Date;
    onDateChange;
    currentCategory: string; // Changed from currentTag
    onCategoryPress: () => void;
};

const InputCard = ({
    accountName,
    remainingBalance,
    onCalendarPress,
    currentDate,
    showDatePicker,
    selectedDate,
    onDateChange,
    currentCategory, // Changed from currentTag
    onCategoryPress,
}: InputCardProps) => {
    const height = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        overflow: 'hidden',
    }));

    const toggleAccordion = () => {
        height.value = withTiming(showDatePicker ? 0 : 300, { duration: 300 });
        onCalendarPress();
    };

    return (
        <View style={styles.mainCard}>
            <View style={styles.mainCardContent}>
                <View style={styles.innerCard}>
                    <View style={styles.iconContainer}>
                        <Icon name="account-balance-wallet" size={24} color="#666666" />
                    </View>
                    <Text style={styles.cardItemText}>{accountName}</Text>
                    <Text style={styles.balance}>${remainingBalance}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.innerCard, styles.middleCard]}
                    onPress={toggleAccordion}
                >
                    <View style={styles.iconContainer}>
                        <Icon name="calendar-today" size={24} color="#666666" />
                    </View>
                    <Text style={styles.cardItemText}>{currentDate}</Text>
                </TouchableOpacity>
                <Animated.View style={animatedStyle}>
                    <DateTimePicker
                        date={selectedDate}
                        mode="single"
                        onChange={onDateChange}
                    />
                </Animated.View>
                <TouchableOpacity onPress={onCategoryPress} style={styles.innerCard}>
                    <View style={styles.iconContainer}>
                        <Icon name="category" size={24} color="#666666" />
                    </View>
                    <Text style={[
                        styles.cardItemText,
                        !currentCategory && styles.placeholderText
                    ]}>
                        {currentCategory || "Select category"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainCard: {
        width: '100%',
        marginBottom: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    mainCardContent: {
        padding: 0,
    },
    innerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    middleCard: {
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    iconContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    cardItemText: {
        fontSize: 16,
        flex: 1,
        color: '#333333',
    },
    balance: {
        fontSize: 16,
        color: '#333333',
    },
    placeholderText: {
        color: '#999999',
    },
});

export default InputCard;
