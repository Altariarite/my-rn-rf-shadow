import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BalanceCardProps {
    netWorth: number;
    lastUpdated: string;
    difference: number;
    isSelected: boolean;
}

export default (props: BalanceCardProps) => {
    const increase = props.difference > 0;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.label}>Net Worth</Text>
                <Text style={styles.date}>{props.lastUpdated}</Text>
            </View>
            <Text style={styles.netWorth}>${props.netWorth.toFixed(2)}</Text>
            <View style={styles.footer}>
                <View style={styles.differenceContainer}>
                    <Text style={[styles.difference, { color: increase ? '#4CAF50' : '#F44336' }]}>
                        {increase ? '+' : '-'}${Math.abs(props.difference).toFixed(2)}
                    </Text>
                    <Text style={[styles.arrow, { color: increase ? '#4CAF50' : '#F44336' }]}>
                        {increase ? '↑' : '↓'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666666',
        marginRight: 50,
    },
    date: {
        fontSize: 14,
        color: '#666666',
    },
    netWorth: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    differenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    difference: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    arrow: {
        fontSize: 20,
        marginLeft: 4,
    },
});