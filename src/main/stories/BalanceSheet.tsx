import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const getColorVariation = (baseColor: string, index: number): string => {
    const hue = parseInt(baseColor.slice(1), 16);
    const variation = (index * 1000) % 40 - 20;
    return `#${((hue + variation) % 0xFFFFFF).toString(16).padStart(6, '0')}`;
};

const BalanceSheet = ({ assets, liabilities, equity }: { assets: Record<string, number>, liabilities: Record<string, number>, equity: Record<string, number> }) => {
    const totalValue = Object.values(assets).reduce((sum, value) => sum + value, 0) +
        Object.values(liabilities).reduce((sum, value) => sum + value, 0) +
        Object.values(equity).reduce((sum, value) => sum + value, 0);

    const renderSquares = (items: Record<string, number>, baseColor: string) => {
        return Object.entries(items).map(([key, value], index) => (
            <React.Fragment key={key}>
                <View style={[
                    styles.square,
                    { backgroundColor: getColorVariation(baseColor, index), height: Math.max((value / totalValue) * 100, 5) + '%' }
                ]}>
                    <Text style={styles.squareText} numberOfLines={1} ellipsizeMode="tail">{key}</Text>
                    <Text style={styles.squareValue} numberOfLines={1} ellipsizeMode="tail">{value}</Text>
                </View>
                {index < Object.entries(items).length - 1 && <View style={styles.separator} />}
            </React.Fragment>
        ));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Balance Sheet</Text>
            <View style={styles.squaresContainer}>
                <View style={styles.column}>
                    {renderSquares(assets, '#FFB3BA')}
                </View>
                <View style={styles.column}>
                    {renderSquares(liabilities, '#BAFFC9')}
                    {renderSquares(equity, '#BAE1FF')}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFF5E6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#FF6B6B',
    },
    squaresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height * 0.7,
    },
    column: {
        width: '48%',
    },
    square: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 2,
        minHeight: 30,
    },
    squareText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 2,
    },
    squareValue: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        paddingHorizontal: 2,
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        width: '100%',
    },
});

export default BalanceSheet;
