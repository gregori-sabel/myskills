import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Platform,
  FlatList,
} from 'react-native'; 

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData{
  id: string;
  name: string;
}

export function Home() {
  const [ newSkill, setNewSkill] = useState('');
  const [ mySkills, setMySkills] = useState<SkillData[]>([]);
  const [ gretting, setGretting] = useState('');

  function handleAddSNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data])
  }

  function handleRemoveSkill( id: string ) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if(currentHour < 12){
      setGretting(`Bom dia ${currentHour}`)
    } 
    else if(currentHour < 18){
      setGretting(`Boa tarde ${currentHour}`)
    }
    else {
      setGretting(`Boa noite ${currentHour}`)
    }
  },[])

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Grégori</Text>
        
        <Text style={styles.grettings}>
         {gretting}
        </Text>        

        <TextInput 
          style={styles.input}
          placeholder="New Skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button title='Add Skill' onPress={handleAddSNewSkill}/>

        <Text style={[styles.title, { marginVertical: 50}]}>
          My Skills
        </Text>


        <FlatList 
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <SkillCard 
              skill={item.name} 
              onPress={() => handleRemoveSkill(item.id)}
            />
          )} 
        />
          

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 10
  },
  buttonSkill: {
    backgroundColor: '#1F1E25',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginVertical: 10
  },
  textSkill:{
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  grettings: {
    color: 'white'
  }
})