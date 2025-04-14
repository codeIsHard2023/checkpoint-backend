# GraphQL Countries API

## Projet et technologies utilisées

Le projet a été créé et initialisé avec les technologies suivantes :
- TypeScript
- Apollo Server
- TypeGraphQL
- TypeORM
- SQLite
- Class-validator

## Fonctionnalités implémentées

### Mutation pour ajouter un pays

Une mutation `createCountry` a été ajoutée permettant d'enregistrer un nouveau pays dans la base de données avec les paramètres suivants :

```
mutation CreateCountry($data: CountryCreateInput!) {
  createCountry(data: $data) {
    id,
    continent {
      id,
      name
    }
  }
}
```

### Requêtes de lecture avant le rajout des continents

Les queries suivantes ont été implémentées :
1. `getCountries` : Renvoie la liste de tous les pays avec leurs attributs (code ISO, nom, emoji)
```
query Countries {
  getAllcountries {
    iso,
    name,
    emoji
  }
}
```
2. `getCountryByIso` : Renvoie un pays spécifique recherché par son code ISO
```
query GetCountryByIso($iso: String!) {
  getCountryByIso(iso: $iso) {
    name,
    emoji
  }
}
```

### Prise en compte du continent

La relation entre pays et continents a été implémentée via :
- Une entité `Continent` avec une relation OneToMany vers l'entité `Country`
- L'entité `Country` avec une relation ManyToOne vers l'entité `Continent`
- L'ajout du champ continent dans la mutation de création de pays
- Une query dédiée pour filtrer les pays par continent

### Exemple de mutation pour créer un pays
```
mutation CreateCountry($data: CountryCreateInput!) {
  createCountry(data: $data) {
    id,
    continent {
      id,
      name
    }
  }
}
```

### Exemples de queries

#### 1. Récupérer tous les pays
```
query GetAllCountries {
  getCountries {
    id
    iso
    name
    emoji
    continent {
      id
      name
    }
  }
}
```

#### 2. Rechercher un pays par son code ISO
```
query GetCountryByIso {
  getCountryByIso(iso: $iso) {
    id
    iso
    name
    emoji
    continent {
      id
      name
    }
  }
}
```

#### 3. Récupérer tous les pays d'un continent
```
query GetContinentCountries($getContinentCountriesId: ID!) {
  getContinentCountries(id: $getContinentCountriesId) {
    id,
    name,
    iso,
    emoji
  }
}
```
