import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Category = {
    id: string;
    name: string;
    group: 'Inflow' | 'Bill' | 'Need' | 'Want';
};

type CategoryScreenProps = {
    categories: Category[];
    onSearch: (query: string) => void;
    onAddCategory: () => void;
};

const CategoryScreen = ({ categories, onAddCategory }: CategoryScreenProps) => {
    const groupedCategories = {
        Inflow: categories.filter(c => c.group === 'Inflow'),
        Bill: categories.filter(c => c.group === 'Bill'),
        Need: categories.filter(c => c.group === 'Need'),
        Want: categories.filter(c => c.group === 'Want'),
    };

    const renderCategoryGroup = ({ item: [group, cats] }: { item: [string, Category[]] }) => (
        <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group}</Text>
            <FlatList
                data={cats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.categoryItem}>{item.name}</Text>}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onAddCategory} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add New Category</Text>
            </TouchableOpacity>

            <FlatList
                data={Object.entries(groupedCategories)}
                keyExtractor={(item) => item[0]}
                renderItem={renderCategoryGroup}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    addButton: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        borderRadius: 5,
    },
    addButtonText: {
        color: '#333',
    },
    groupContainer: {
        marginBottom: 20,
    },
    groupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    categoryItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default CategoryScreen;
