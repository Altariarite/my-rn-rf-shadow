import React from 'react';
import {
    SafeAreaView,
    FlatList,
    StyleSheet,
    Dimensions,
    View,
} from 'react-native';
import BalanceCard from './BalanceCard';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        netWorth: 50000,
        lastUpdated: '2023-04-15',
        difference: 1500,
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        netWorth: 75000,
        lastUpdated: '2023-04-16',
        difference: -500,
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        netWorth: 100000,
        lastUpdated: '2023-04-17',
        difference: 3000,
    },
];

const App = () => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const containerHeight = screenHeight * 0.2; // 20% of screen height
    const cardWidth = screenWidth * 0.8; // 80% of screen width

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={[styles.scrollableContainer, { height: containerHeight }]}>
                <FlatList
                    data={DATA}
                    renderItem={({ item }) => (
                        <BalanceCard
                            netWorth={item.netWorth}
                            lastUpdated={item.lastUpdated}
                            difference={item.difference}
                            isSelected={item.id === '3ac68afc-c605-48d3-a4f8-fbd91aa97f63'}
                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    contentContainerStyle={[
                        styles.listContent,
                        { paddingHorizontal: screenWidth * 0.1 } // Add padding equal to 10% of screen width on each side
                    ]}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={cardWidth}
                    decelerationRate="fast"
                    pagingEnabled
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollableContainer: {
        width: '100%',
    },
    listContent: {
        alignItems: 'center',
    },
});

export default App;