import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Contenedor general del bloque de opciones
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },

  // Título de la sección
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },

  // Fila de opciones (2x2)
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12, // espacio entre botones
  },

  // Botón de opción
  option: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 4,
    marginBottom: 12,
    width: '45%', // dos por fila
    alignItems: 'center',
  },

  // Emoji dentro del botón
  emoji: {
    fontSize: 50,
  },

  // Estilo cuando la opción es correcta
  correct: {
    backgroundColor: '#4CAF50',
  },

  // Estilo cuando la opción es incorrecta
  incorrect: {
    backgroundColor: '#F44336',
  },
});