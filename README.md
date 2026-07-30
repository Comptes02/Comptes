# Comptes

Application de suivi de comptes personnels. Ce dépôt contient **le programme uniquement**.

## Aucune donnée personnelle ici

Les fichiers publiés (`index.html`, `sw.js`, `manifest.webmanifest`, les icônes) sont le code de
l'application. Ils ne contiennent aucun montant, aucun nom de compte, aucune opération.

Les données d'un utilisateur restent :

- sur son Mac, dans `~/Library/Application Support/Comptes/data.json` ;
- et, si la synchronisation est activée, dans un dossier privé de **son** Google Drive,
  réservé à cette application.

Quelqu'un qui ouvre le site voit une application vide, avec ses propres données à lui.

## À ne jamais téléverser ici

- `data.json` / `data.previous.json`
- tout fichier produit par *Fichier → Sauvegarder une copie…* (`comptes-AAAA-MM-JJ.json`)

Ces fichiers-là contiennent les vraies opérations. Ils n'ont rien à faire dans un dépôt public.

## Mettre à jour le site

Ne pas modifier les fichiers ici : modifier la source dans `~/Downloads/budget-app`, lancer
`bash ~/Downloads/budget-app/build.sh` (qui régénère ce dossier), puis téléverser à nouveau.
