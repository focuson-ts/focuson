export function findValidityDetails ( pageHolderClass: string ): [ string, boolean ][] {
  const allPages = document.getElementsByClassName ( pageHolderClass )
  const thisPage = allPages.item ( allPages.length - 1 )
  console.log ( 'thisPage', !!thisPage )
  const inputs = thisPage?.getElementsByTagName ( "input" )
  console.log ( 'inputs', inputs?.length )
  const result: [ string, boolean ][] = []
  if ( inputs ) {
    for ( var i = 0; i < inputs.length; i++ ) {
      const child = inputs[ i ];
      let id = child.getAttribute ( 'id' );
      let recordedId = id ? id : "noIdForThisElement"
      result[ i ] = [ recordedId, child.checkValidity () ]
    }
  }
  return result
}

export function isValidToCommit ( pageHolderClass: string ): boolean {
  return findValidityDetails ( pageHolderClass ).reduce ( ( acc: boolean, [ id, valid ] ) => acc && valid, true )
}
