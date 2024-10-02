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
    onCategoryPress: (category: Category) => void;
};

const CategoryScreen = ({ categories, onAddCategory, onCategoryPress }: CategoryScreenProps) => {
    const groupedCategories = {
        Inflow: categories.filter(c => c.group === 'Inflow'),
        Bill: categories.filter(c => c.group === 'Bill'),
        Need: categories.filter(c => c.group === 'Need'),
        Want: categories.filter(c => c.group === 'Want'),
    };

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={styles.categoryItemContainer}
            onPress={() => onCategoryPress(item)}
        >
            <Text style={styles.categoryItemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderCategoryGroup = ({ item: [group, cats] }: { item: [string, Category[]] }) => (
        <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{group}</Text>
            <FlatList
                data={cats}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryItem}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
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
    categoryItemContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d0d0d0',
        marginVertical: 5,
    },
    categoryItemText: {
        fontSize: 16,
        color: '#333333',
    },
    itemSeparator: {
        height: 10,
    },
    categoryItem: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default CategoryScreen;
