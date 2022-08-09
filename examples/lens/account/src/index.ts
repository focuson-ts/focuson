import { Lenses } from "@focuson/lens";

export interface Account {
  main: Customer;
  joint: Customer;
}

export interface Customer {
  occupations: Occupation[]
  address: Address
}

export interface Occupation {
  occupationType: 'selfEmployed' | 'employed' | 'unemployed' | 'homesupport';
  employersAddress?: Address;
  accountant?: Accountant;
  from: string;
}

export interface Accountant {
  name: string;
  address: Address;
}

export interface Address {
  line1: string;
  line2: string;
  line3?: string;
}

export const account: Account = {
  main: {
    address: { line1: '127 King Charles Walk', line2: 'watford' }, occupations: [ {
      occupationType: 'employed', from: '2010', employersAddress: { line1: 'NatWest bank', line2: 'Watford' },
      accountant: { name: 'Bob', address: { line1: '', line2: '' } }
    },
      { occupationType: 'employed', from: '2015', accountant: { name: 'Jill', address: { line1: '', line2: '' } } },
    ],
  },
  joint: { address: { line1: '127 King Charles Walk', line2: 'watford' }, occupations: [ { occupationType: 'homesupport', from: '2010' } ] }
}

//Your task
// write code and tests for the methods
// updateEmployerAddress(account: Account, occupationIndex: number, jointOrMain: boolean, address: Address)
// updateAccountantsAddress(account: Account, occupationIndex: number, jointOrMain: boolean,address: Address)

let accountL = Lenses.identity<Account> ();

const mainOrJointL = ( jointOrMain: boolean ) => jointOrMain ? accountL.focusOn ( 'main' ) : accountL.focusOn ( 'joint' )

const nthOccupationL = ( jointOrMain: boolean, n: number ) =>
  mainOrJointL ( jointOrMain ).focusOn ( 'occupations' ).chain ( Lenses.nth ( n ) );

const updateOccupationAddressWithLens = ( account: Account, jointOrMain: boolean, occupationIndex: number, address: Address ) =>
  nthOccupationL ( jointOrMain, occupationIndex ).focusOn ( 'employersAddress' ).set ( account, address );

const updateAccountantAddressWithLens = ( account: Account, jointOrMain: boolean, occupationIndex: number, address: Address ) =>
  nthOccupationL ( jointOrMain, occupationIndex ).focusOn ( 'accountant' ).focusOn ( 'address' ).set ( account, address );




function updateOccupationAddress ( occupations: Occupation[], occupationIndex: number, address: Address ) {
  const newOccupations = [ ...occupations ]
  newOccupations[ occupationIndex ] = { ...occupations[ occupationIndex ], employersAddress: address }
  return newOccupations
}

function updateMainEmployerAddress ( account: Account, occupationIndex: number, address: Address ) {
  const newOccupation = updateOccupationAddress ( account.main.occupations, occupationIndex, address )
  return { ...account, main: { ...account.main, occupation: updateOccupationAddress ( account.main.occupations, occupationIndex, address ) } };
}

function updateJointEmployerAddress ( account: Account, occupationIndex: number, address: Address ) {
  return { ...account, main: { ...account.joint, occupation: updateOccupationAddress ( account.joint.occupations, occupationIndex, address ) } };
}

export function updateEmployerAddress ( account: Account, occupationIndex: number, jointOrMain: boolean, address: Address ) {
  return jointOrMain ? updateMainEmployerAddress ( account, occupationIndex, address ) : updateJointEmployerAddress ( account, occupationIndex, address )
  return { ...account, }
}

function updateAccountsAddressInOccuations ( occupations: Occupation[], occupationIndex: number, address: Address ) {
  const newOccupations = [ ...occupations ]
  newOccupations[ occupationIndex ] = { ...occupations[ occupationIndex ], accountant: { ...occupations[ occupationIndex ].accountant, address } }
  return newOccupations
}
function updateMainAccountantsAddress ( account: Account, occupationIndex: number, address: Address ) {
  return { ...account, main: { ...account.main, occupation: updateAccountsAddressInOccuations ( account.main.occupations, occupationIndex, address ) } };
}
function updateJointAccountantsAddress ( account: Account, occupationIndex: number, address: Address ) {
  return { ...account, main: { ...account.joint, occupation: updateAccountsAddressInOccuations ( account.joint.occupations, occupationIndex, address ) } };
}
export function updateAccountantsAddress ( account: Account, occupationIndex: number, jointOrMain: boolean, address: Address ) {
  return jointOrMain ? updateMainAccountantsAddress ( account, occupationIndex, address ) : updateJointAccountantsAddress ( account, occupationIndex, address )
  return { ...account, }
}

