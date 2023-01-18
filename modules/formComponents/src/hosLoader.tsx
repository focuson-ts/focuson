export interface HosLoaderProps {
  className?: string
  msg: string
  button: string
  onClick: (e: any) => void
}

export const HosLoader = ({className, msg, button, onClick }: HosLoaderProps) => {
  const message = msg !== undefined ? msg : 'Loading, please wait...'
  return (
    <div className={className ? className : 'dialog confirm-window'}>
      <div className="wrapper wrapper-overlay">
        <div className="content-block">
          <div className="content-loader">
            <div className="non-branded">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="content-text-block">
          <div className="content-text">
            {message}
          </div>
          {button ? <button onClick={onClick}>{button ? button : 'close'}</button> : <></>}
        </div>
      </div>
    </div>
  )
}