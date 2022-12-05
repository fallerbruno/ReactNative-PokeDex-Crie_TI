import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const Cardusers = (item) => {
    
    const icone_sexo = item.sex == 'M' ? 'man' : 'woman';

    return <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.card, theme.shadows]} key={item.id} onPress={() => alterUser(item)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name={icone_sexo} size={24}
                color={item.sex == 'M' ? "#7986CB" : "#F06292"}
                style={{ marginRight: 16 }} />
            <View>
                <Text style={styles.titleCard}>{item.name}</Text>
                <Text style={styles.subtitleCard}>{item.email}</Text>
            </View>
        </View>
        <AntDesign name="right" size={24} color="black" />
    </TouchableOpacity>
}


export default Cardusers;