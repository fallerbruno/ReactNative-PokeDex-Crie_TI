import LottieView from 'lottie-react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/Theme';

export default function FloatingButton({ icon, onPress, textColor }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button]} >
                <LottieView
                autoPlay
                loop={false}
                source={require('../assets/animations/plus.json')}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 75,
        height: 75,
        position: 'absolute',
        bottom: 30,
        right: 10
    }
})