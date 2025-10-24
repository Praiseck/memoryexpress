import React from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from '../components/Styles/missions.styles';
import { DailyMissionsPanel } from '../components/dailyMissionsPanel';

const MisionesScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📆 Misiones Diarias</Text>
      <DailyMissionsPanel />
      {/* Aquí luego puedes agregar WeeklyMissionTracker */}
    </ScrollView>
  );
};

export default MisionesScreen;