export default function intervalDate(date1: Date, date2: Date): number {
  // Calculer la différence en millisecondes
  const differenceInMilliseconds: number = date1.getTime() - date2.getTime();

  // Convertir en jours (1 jour = 24 * 60 * 60 * 1000 millisecondes)
  const differenceInDays: number = differenceInMilliseconds / (24 * 60 * 60 * 1000);

  // Arrondir au nombre entier le plus proche et retourner
  return Math.abs(Math.ceil(differenceInDays));
}
