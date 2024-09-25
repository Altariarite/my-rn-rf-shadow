import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ModalProps = {
    onBack: () => void;
    onDone: () => void;
    title: string;
    children: React.ReactNode;
};

const Modal = ({ onBack, onDone, title, children }: ModalProps) => (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onDone} style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        marginRight: 16,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000000',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    doneButton: {
        marginLeft: 'auto',
    },
    doneButtonText: {
        fontSize: 16,
        color: '#000000',
    },
    content: {
        flex: 1,
        padding: 16,
    },
});

export default Modal;
