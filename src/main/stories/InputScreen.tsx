import React from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import Modal from './Modal'; // Adjust the import path as needed
import InputCard from './InputCard'; // Add this import

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
    onDateChange;
    showDatePicker: boolean;
    selectedDate: Date;
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
    currentTag,
    transactionType,
    onTransactionTypeChange,
    onBack,
    onDone,
    onDateChange,
    showDatePicker,
    selectedDate,
}) => {
    return (
        <Modal
            title='Input'
            onBack={onBack}
            onDone={onDone}
        >

            <DismissKeyboard>
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
                        currentTag={currentTag}
                    />
                </View>
            </DismissKeyboard>

        </Modal >
    );
};

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

export default React.memo(InputScreen);

