import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddBrandResponse = Brand | BrandExists;

export type AddCarResponse = Car;

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type BrandExists = {
  __typename?: 'BrandExists';
  message: Scalars['String'];
};

export type Car = {
  __typename?: 'Car';
  brand?: Maybe<Brand>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBrand: AddBrandResponse;
  addCar: AddCarResponse;
};


export type MutationAddBrandArgs = {
  name: Scalars['String'];
};


export type MutationAddCarArgs = {
  brandName?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  brands: Array<Brand>;
  cars: Array<Car>;
};

export type CarsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarsQuery = { __typename?: 'Query', cars: Array<{ __typename?: 'Car', id: string, name: string, brand?: { __typename?: 'Brand', name: string } | null | undefined }> };

export type BrandsQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandsQuery = { __typename?: 'Query', brands: Array<{ __typename?: 'Brand', id: string, name: string }> };

export type CarFieldsFragment = { __typename?: 'Car', id: string, name: string, brand?: { __typename?: 'Brand', name: string } | null | undefined };

export type BrandFieldsFragment = { __typename?: 'Brand', id: string, name: string };

export type AddCarMutationVariables = Exact<{
  name: Scalars['String'];
  brandName: Scalars['String'];
}>;


export type AddCarMutation = { __typename?: 'Mutation', addCar: { __typename: 'Car', id: string, name: string, brand?: { __typename?: 'Brand', name: string } | null | undefined } };

export type AddBrandMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type AddBrandMutation = { __typename?: 'Mutation', addBrand: { __typename: 'Brand', id: string, name: string } | { __typename: 'BrandExists', message: string } };

export const CarFieldsFragmentDoc = gql`
    fragment CarFields on Car {
  id
  name
  brand {
    name
  }
}
    `;
export const BrandFieldsFragmentDoc = gql`
    fragment BrandFields on Brand {
  id
  name
}
    `;
export const CarsDocument = gql`
    query Cars {
  cars {
    ...CarFields
  }
}
    ${CarFieldsFragmentDoc}`;

export function useCarsQuery(options: Omit<Urql.UseQueryArgs<CarsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CarsQuery>({ query: CarsDocument, ...options });
};
export const BrandsDocument = gql`
    query Brands {
  brands {
    ...BrandFields
  }
}
    ${BrandFieldsFragmentDoc}`;

export function useBrandsQuery(options: Omit<Urql.UseQueryArgs<BrandsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BrandsQuery>({ query: BrandsDocument, ...options });
};
export const AddCarDocument = gql`
    mutation AddCar($name: String!, $brandName: String!) {
  addCar(name: $name, brandName: $brandName) {
    __typename
    ... on Car {
      __typename
      ...CarFields
    }
  }
}
    ${CarFieldsFragmentDoc}`;

export function useAddCarMutation() {
  return Urql.useMutation<AddCarMutation, AddCarMutationVariables>(AddCarDocument);
};
export const AddBrandDocument = gql`
    mutation AddBrand($name: String!) {
  addBrand(name: $name) {
    __typename
    ... on BrandExists {
      __typename
      message
    }
    ... on Brand {
      __typename
      ...BrandFields
    }
  }
}
    ${BrandFieldsFragmentDoc}`;

export function useAddBrandMutation() {
  return Urql.useMutation<AddBrandMutation, AddBrandMutationVariables>(AddBrandDocument);
};