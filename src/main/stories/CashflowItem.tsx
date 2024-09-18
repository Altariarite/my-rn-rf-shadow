import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Item = {
    id: string;
    date: string;
    amount: number;
    type: 'income' | 'expense' | 'transfer';
    tags: string[];
};

const CashflowItem: React.FC<{ item: Item }> = ({ item }) => (
    <View style={styles.listItem}>
        <View style={styles.itemContent}>
            <View style={styles.leftContent}>
                <Text style={styles.itemType}>{getItemTypeIcon(item.type)}</Text>
                <Text style={styles.itemAmount}>{formatAmount(item.amount)}</Text>
            </View>
            <View style={styles.tagsContainer}>
                {item.tags.map((tag, index) => (
                    <Text key={index} style={styles.tag}>{tag}</Text>
                ))}
            </View>
        </View>
    </View>
);

const getItemTypeIcon = (type: 'income' | 'expense' | 'transfer'): string => {
    switch (type) {
        case 'income':
            return '+';
        case 'expense':
            return '-';
        case 'transfer':
            return '↔';
    }
};

const formatAmount = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

const formatDate = (date: string): string => {
    return date;
};

const styles = StyleSheet.create({
    listItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        flex: 1,
    },
    tag: {
        fontSize: 14,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 5,
    },
    itemAmount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
});

export default CashflowItem;