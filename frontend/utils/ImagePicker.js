import React from 'react'
import {
    StyleSheet,
    Text,
    Button,
    View,
    ActivityIndicator,
    Image
} from 'react-native';


const ImagePicker = ({ imageType }) => {
    return (
        <View>
            {imageType === 0 ? <Image style={styles.tinyLogo} source={require('../images/verySmiley.png')} />
                : imageType === 1 ? <Image style={styles.tinyLogo} source={require('../images/smiley.png')} />
                    : imageType === 2 ? <Image style={styles.tinyLogo} source={require('../images/normal.png')} />
                        : imageType === 3 ? <Image style={styles.tinyLogo} source={require('../images/sad.png')} />
                            : imageType === 4 ? <Image style={styles.tinyLogo} source={require('../images/verySad.png')} />
                                : imageType === 5 ? <Image style={styles.tinyLogo} source={require('../images/alcolici.png')} />
                                    : imageType === 6 ? <Image style={styles.tinyLogo} source={require('../images/alzarsi.png')} />
                                        : imageType === 7 ? <Image style={styles.tinyLogo} source={require('../images/caffe.png')} />
                                            : imageType === 8 ? <Image style={styles.tinyLogo} source={require('../images/pisolino.png')} />
                                                : imageType === 9 ? <Image style={styles.tinyLogo} source={require('../images/sigaretta.png')} />
                                                    : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    tinyLogo: {
        width: 40,
        height: 40,
    },
});

export default ImagePicker



