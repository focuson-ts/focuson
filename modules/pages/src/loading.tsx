import {ModalContext} from "./modal/modalCommitAndCancelButton";
import {LensState} from "@focuson-nw/state";

export function Loading<S, C extends ModalContext<S>> ( state: LensState<S, any, C> ) {
  return (
    <div className={'dialog loading'}>
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
            <p>Please wait...</p>
          </div>
        </div>
      </div>
    </div>
  )
}