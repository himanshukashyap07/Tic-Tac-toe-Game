import { View, Text, Image, FlatList, Pressable, StyleSheet,SafeAreaView,StatusBar } from 'react-native'
import React, { useState } from 'react'
import type { PropsWithChildren } from 'react';
import Snackbar from 'react-native-snackbar';
import Circle from './Circle.png'
import Cross from './Cross.png'
import pencil from './pencil.png'

type iconprops = PropsWithChildren<{
    name: string
}>

const Icons = ({ name }: iconprops) => {
    switch (name) {
        case "Circle":
            return <Image source={Circle} style={{ width: 100, height: 100 }} />

        case "Cross":
            return <Image source={Cross} style={{ width: 100, height: 100 }} />

        default:
            return <Image source={pencil} style={{ width: 100, height: 100 }} />
    }
}

const TicTocToe = (): JSX.Element => {
    const [isCross, setIsCross] = useState<boolean>(false);
    const [gameWinner, setGameWinner] = useState<string>('');
    const [gamestate, setGameState] = useState(new Array(9).fill('empty', 0, 9)) //['empty','empty','empty','empty','empty','empty','empty','empty','empty']
    function checkIsWinner() {
        if (
            gamestate[0] == gamestate[1] &&
            gamestate[1] == gamestate[2] &&
            gamestate[0] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[0]}`)
        } else if (
            gamestate[3] == gamestate[4] &&
            gamestate[4] == gamestate[5] &&
            gamestate[3] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[3]}`)
        } else if (
            gamestate[6] == gamestate[7] &&
            gamestate[7] == gamestate[8] &&
            gamestate[6] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[6]}`)
        } else if (
            gamestate[0] == gamestate[3] &&
            gamestate[3] == gamestate[6] &&
            gamestate[0] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[0]}`)

        } else if (
            gamestate[1] == gamestate[4] &&
            gamestate[4] == gamestate[7] &&
            gamestate[1] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[1]}`)
        } else if (
            gamestate[2] == gamestate[5] &&
            gamestate[5] == gamestate[8] &&
            gamestate[2] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[2]}`)

        } else if (
            gamestate[0] == gamestate[4] &&
            gamestate[4] == gamestate[8] &&
            gamestate[0] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[0]}`)
        } else if (
            gamestate[2] == gamestate[4] &&
            gamestate[4] == gamestate[6] &&
            gamestate[2] != 'empty'
        ) {
            setGameWinner(`The game winner is ${gamestate[2]}`)
        } else if (!gamestate.includes('empty', 0)) {
            setGameWinner('Draw game... ⌛️');
        }
    }

    function onChange(itemNumber: number) {
        if (gameWinner) {
            return Snackbar.show({
                text: gameWinner,
                backgroundColor: '#000000',
                textColor: "#FFFFFF"
            })
        }
        if (gamestate[itemNumber] === 'empty') {
            gamestate[itemNumber] = isCross ? 'Cross' : 'Circle';
            setIsCross(!isCross);
        } else {
            return Snackbar.show({
                text: "Position is already filled",
                backgroundColor: "red",
                textColor: "#FFF"
            })
        }
        checkIsWinner()
    }

    function reStartGame() {
        setIsCross(false);
        setGameWinner('');
        setGameState(new Array(9).fill('empty', 0, 9))
    }


    return (
        <SafeAreaView >
        <StatusBar />
        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerTxt}>{gameWinner}</Text>
          </View>
        ) : (
          <View
          style={[
            styles.playerInfo,
            isCross ? styles.playerX : styles.playerO
          ]}
          >
            <Text style={styles.gameTurnTxt}>
              Player {isCross? 'X' : 'O'}'s Turn
            </Text>
          </View>
        )}
        {/* Game Grid */}
        <FlatList
        numColumns={3}
        data={gamestate}
        style={styles.grid}
        renderItem={({item, index}) => (
          <Pressable
          key={index}
          style={styles.card}
          onPress={() => onChange(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
        />
        {/* game action */}
        <Pressable
        style={styles.gameBtn}
        onPress={reStartGame}
        >
          <Text style={styles.gameBtnText}>
            {gameWinner ? 'Start new game' : 'reLoad the game'}
          </Text>
        </Pressable>
      </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    playerInfo: {
      height: 56,
  
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  
      borderRadius: 4,
      paddingVertical: 8,
      marginVertical: 12,
      marginHorizontal: 14,
  
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowColor: '#333',
      shadowOpacity: 0.2,
      shadowRadius: 1.5,
    },
    gameTurnTxt: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    playerX: {
      backgroundColor: '#38CC77',
    },
    playerO: {
      backgroundColor: '#F7CD2E',
    },
    grid: {
      margin: 12,
    },
    card: {
      height: 100,
      width: '33.33%',
  
      alignItems: 'center',
      justifyContent: 'center',
  
      borderWidth: 1,
      borderColor: '#333',
    },
    winnerInfo: {
      borderRadius: 8,
      backgroundColor: '#38CC77',
  
      shadowOpacity: 0.1,
    },
    winnerTxt: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '600',
      textTransform: 'capitalize',
    },
    gameBtn: {
      alignItems: 'center',
  
      padding: 10,
      borderRadius: 8,
      marginHorizontal: 36,
      backgroundColor: '#8D3DAF',
    },
    gameBtnText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '500',
    },
  });
export default TicTocToe