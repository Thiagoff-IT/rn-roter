import { View, Text, Button, FlatList } from "react-native";
import { useRouter } from 'expo-router'

// axios(api), api do github,

interface Item {
    id: string;
    title: string
}

const data = [
    {id: 1, title: "Item 1"},
    {id: 2, title: "Item 2"},
    {id: 3, title: "Item 3"},
    {id: 4, title: "Item 4"},
]

export default function Index(){
    
    const router = useRouter();
    
    return(
        <View>
            <Text>Hello Ecomp!</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>(
                   <View>
                    <Text>
                        {item.title}
                    </Text>
                   </View> 
                )}
            />
            <Button
                title="Capacita"
                onPress={() => router.push('/capacita')}
            />
        </View>
    )
}