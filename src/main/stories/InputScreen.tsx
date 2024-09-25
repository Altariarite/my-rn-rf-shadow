import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from './Modal'; // Adjust the import path as needed

type InputScreenProps = {
    accountName: string;
    remainingBalance: number;
    onAmountChange: (amount: string) => void;
    onCalendarPress: () => void;
    onTagPress: () => void;
    currentDate: string; // Add this prop
    currentTag: string; // Add this prop
    transactionType: 'spending' | 'income' | 'transfer';
    onTransactionTypeChange: (value: 'spending' | 'income' | 'transfer') => void;
    isVisible: boolean;
    onBack;
    onDone: () => void;
};

const InputScreen: React.FC<InputScreenProps> = ({
    accountName,
    remainingBalance,
    onAmountChange,
    onCalendarPress,
    onTagPress,
    currentDate,
    currentTag,
    transactionType,
    onTransactionTypeChange,
    onBack,
    onDone
}) => (
    <Modal
        title='Input'
        onBack={onBack}
        onDone={onDone}
    >
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 20}
        >
            <View style={styles.content}>
                <SegmentedButtons
                    value={transactionType}
                    onValueChange={onTransactionTypeChange}
                    buttons={[
                        {
                            value: 'spending',
                            label: 'Spending',
                            style: transactionType === 'spending' ? styles.selectedButton : styles.unselectedButton,
                        },
                        {
                            value: 'income',
                            label: 'Income',
                            style: transactionType === 'income' ? styles.selectedButton : styles.unselectedButton,
                        },
                        {
                            value: 'transfer',
                            label: 'Transfer',
                            style: transactionType === 'transfer' ? styles.selectedButton : styles.unselectedButton,
                        },
                    ]}
                    style={styles.segmentedButton}
                />

                <TextInput
                    autoFocus
                    keyboardType="numeric"
                    onChangeText={onAmountChange}
                    style={styles.input}
                    placeholder="Enter amount test"
                />

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.accountName}>{accountName}</Text>
                        <Text style={styles.balance}>
                            ${remainingBalance.toFixed(2)}
                        </Text>
                    </Card.Content>
                </Card>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.roundedSquareButton} onPress={onCalendarPress}>
                        <Icon name="calendar-today" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>{currentDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.roundedSquareButton} onPress={onTagPress}>
                        <Icon name="local-offer" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>{currentTag || "Tag"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    </Modal>
);

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
    card: {
        width: '100%',
        marginBottom: 16,
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    balance: {
        fontSize: 20,
        color: '#333333', // Changed from green to dark gray
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    roundedSquareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#666666', // Changed from blue to medium gray
        borderRadius: 12,
        padding: 12,
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#FFFFFF',
    },
    segmentedButton: {
        marginBottom: 16,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
    selectedButton: {
        backgroundColor: '#f0f0f0', //Lightgray for selected button
    },
    unselectedButton: {
    },
});

export default InputScreen;
