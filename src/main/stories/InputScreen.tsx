import React from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import Modal from './Modal'; // Adjust the import path as needed
import InputCard from './InputCard'; // Add this import

type InputScreenProps = {
    accountName: string;
    remainingBalance: number;
    onAmountChange: (amount: string) => void;
    onCalendarPress: () => void;
    onTagPress: () => void;
    currentDate: string; // Add this prop
    currentCategory: string; // Add this prop
    transactionType: 'spending' | 'income' | 'transfer';
    onTransactionTypeChange: (value: 'spending' | 'income' | 'transfer') => void;
    isVisible: boolean;
    onBack;
    onDone: () => void;
    onDateChange;
    showDatePicker: boolean;
    selectedDate: Date;
    onCategoryPress: () => void;
};

const DismissKeyboard = React.memo(({ children }: { children: React.ReactNode }) => {

    return (
        <KeyboardAvoidingView
            enabled
            style={{ flex: 1 }}
        >
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                keyboardDismissMode={'on-drag'}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
});

const InputScreen: React.FC<InputScreenProps> = ({
    accountName,
    remainingBalance,
    onAmountChange,
    onCalendarPress,
    onTagPress,
    currentDate,
    currentCategory,
    transactionType,
    onTransactionTypeChange,
    onBack,
    onDone,
    onDateChange,
    showDatePicker,
    selectedDate,
    onCategoryPress,
}) => {
    return (
        <DismissKeyboard>
            <View style={styles.content}>
                <View style={styles.segmentedControlContainer}>
                    <SegmentedControl
                        values={['-', '+']}
                        selectedIndex={['spending', 'income'].indexOf(transactionType)}
                        onChange={(event) => {
                            const newValue = ['spending', 'income'][event.nativeEvent.selectedSegmentIndex];
                            onTransactionTypeChange(newValue as 'spending' | 'income');
                        }}
                        style={styles.segmentedControl}
                        fontStyle={styles.segmentedControlText}
                    />
                </View>

                <TextInput
                    autoFocus
                    keyboardType="numeric"
                    onChangeText={onAmountChange}
                    style={styles.input}
                    placeholder="Enter amount"
                />

                <InputCard
                    accountName={accountName}
                    remainingBalance={remainingBalance}
                    onCalendarPress={onCalendarPress}
                    currentDate={currentDate}
                    showDatePicker={showDatePicker}
                    selectedDate={selectedDate}
                    onDateChange={onDateChange}
                    currentCategory={currentCategory}
                    onCategoryPress={onCategoryPress}
                />
            </View>
        </DismissKeyboard>

    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    input: {
        fontSize: 24,
        marginBottom: 16,
        width: '100%',
    },
    mainCard: {
        width: '100%',
        marginBottom: 16,
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
    },
    balance: {
        fontSize: 16,
        color: '#333333',
    },
    segmentedControl: {
        width: width * 0.6, // Adjust this value to change the width
        height: 40, // Increase height to accommodate larger text
    },
    segmentedControlContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    segmentedControlText: {
        fontSize: 16, // Increase font size
        fontWeight: 'bold',
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
});

export default React.memo(InputScreen);

