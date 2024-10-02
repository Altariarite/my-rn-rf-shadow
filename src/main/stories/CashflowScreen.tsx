import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CashflowItem, { Item } from './CashflowItem';

type GroupedItems = {
    [date: string]: Item[];
};

const ItemList: React.FC<{ items: GroupedItems, onAddItem: () => void }> = ({ items, onAddItem }) => {
    const renderItem = ({ item }: { item: [string, Item[]] }) => (
        <View style={styles.card}>
            <Text style={styles.dateHeader}>{item[0]}</Text>
            {item[1].map((cashflowItem) => (
                <CashflowItem key={cashflowItem.id} item={cashflowItem} />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.entries(items)}
                renderItem={renderItem}
                keyExtractor={(item) => item[0]}
            />
            <TouchableOpacity style={styles.floatingButton} onPress={onAddItem}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dateHeader: {
        fontWeight: 'bold',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    floatingButton: {
        position: 'absolute',
        left: '50%',
        bottom: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: -30 }],
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default ItemList;
