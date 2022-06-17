interface ClipboardProps {
    textToCopy: string
}

export function CopyToClipboard(props: ClipboardProps) {
    let copied = false;
    function onClick() {
        copied = true
        navigator.clipboard.writeText(props.textToCopy)
    }

    function onBlur() {
        copied = false
    }

    return (
        <button type="button" className="button-copy" role="button" title="Copy" onClick={onClick} onBlur={onBlur}>
            <span className="icon-copy" title="Copy to clipboard">                                                   
                <svg xmlns="http://www.w3.org/2000/svg" className={copied ? "hide-copy-icon" : "show-copy-icon"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#417505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>         
                <svg xmlns="http://www.w3.org/2000/svg" className={copied ? "show-copy-icon" : "hide-copy-icon"} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#417505" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>        
            </span>
        </button>
    )
}