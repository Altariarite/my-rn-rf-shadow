import React from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import BalanceCard from './BalanceCard';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9; // 90% of screen width

type BalanceCardData = {
    id: string;
    netWorth: number;
    lastUpdated: string;
    difference: number;
};

// Dummy data
const dummyData: BalanceCardData[] = [
    { id: '1', netWorth: 10000.50, lastUpdated: '2023-04-15', difference: 500.25 },
    { id: '2', netWorth: 15000.75, lastUpdated: '2023-04-16', difference: -200.50 },
    { id: '3', netWorth: 8000.00, lastUpdated: '2023-04-17', difference: 100.00 },
    { id: '4', netWorth: 12500.25, lastUpdated: '2023-04-18', difference: 300.75 },
    { id: '5', netWorth: 9800.50, lastUpdated: '2023-04-19', difference: -150.25 },
];

type ScrollableProps = {
    data?: BalanceCardData[];
    isLoading: boolean;
    onEndReached: () => void;
    selectedId: string;
};

const Scrollable: React.FC<ScrollableProps> = ({
    data = dummyData,
    isLoading,
    onEndReached,
    selectedId
}) => {
    const renderItem = ({ item }: { item: BalanceCardData }) => (
        <BalanceCard
            netWorth={item.netWorth}
            lastUpdated={item.lastUpdated}
            difference={item.difference}
            isSelected={item.id === selectedId}
        />
    );

    const renderFooter = () => {
        if (!isLoading) return null;
        return <ActivityIndicator style={styles.loader} />;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingHorizontal: screenWidth * 0.05 }
                ]}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 16,
    },
    loader: {
        marginVertical: 20,
        alignItems: 'center',
    },
});

export default Scrollable;