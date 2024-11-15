import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export default function GithubSearch() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar perfis do GitHub
  const fetchGithubUsers = async () => {
    setLoading(true); // Mostra o indicador de carregamento
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${search}`);
      setUsers(response.data.items);
    } catch (error) {
      console.error('Erro ao buscar usuários do GitHub:', error);
    } finally {
      setLoading(false); // Esconde o indicador de carregamento
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Digite um nome de usuário do GitHub"
        value={search}
        onChangeText={setSearch}
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />
      <Button title="Buscar" onPress={fetchGithubUsers} />
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, backgroundColor: '#f9f9f9', marginBottom: 5 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.login}</Text>
              <Text>Perfil: {item.html_url}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
