

const LetterTile = ({ letter }: { letter: string }) => {
  return (
    <div style={{ 
        backgroundColor: '#BFC9D1', 
        padding: '20px',
        width: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
    }}>
        <p style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            fontFamily: 'Rethink Sans',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em',
        }}>{letter}</p>
    </div>
  )
}

export default LetterTile