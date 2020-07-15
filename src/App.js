import React, {useEffect, useState} from 'react';
import axios from 'axios';
import api from './services/api';
import { SafeAreaView,  ScrollView,  View,  FlatList,  Text,  StatusBar,  StyleSheet,  TouchableOpacity,} from "react-native";
export default function App() {
  const [repositories, setRepositories] = useState ([]);

  useEffect (() => {
    api.get('repositories').then(response => {
       setRepositories(response.data);
    });
}, []);
  
   async function handleLikeRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id ==id);
    await api.post(`repositories/${id}/like`).then(response => {
      repositories[repositoryIndex]=response.data;
      setRepositories([...repositories]);
    });
  };
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"></StatusBar>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item: repository}) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLikeRepository(`${repository.id}`)}>
              <Text style={styles.repository} >{repository.title} </Text>
              <Text style={styles.repository} >{repository.techs}</Text>
              <Text style={styles.repository} testID={`repository-likes-${repository.id}`}>{repository.likes} curtidas</Text>
              <Text style={styles.buttonText} testID={`like-button-${repository.id}`}>Curtir</Text>
            </TouchableOpacity>
          )}
        />
     </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
