import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { lensState, LensState } from "@focuson/state";
import { DeleteStateButton } from "@focuson/form_components";

interface DeleteStateForTest {
  a?: number;
  b?: number;
  c?: number;
}
type Context = {};

function displayAndGetButton<T>(
  s: DeleteStateForTest,
  setMain: (s: DeleteStateForTest) => void,
  fn: (s: LensState<DeleteStateForTest, DeleteStateForTest, Context>) => JSX.Element
) {
  render(fn(lensState<DeleteStateForTest, Context>(s, setMain, 'DeleteState', {})));
  return screen.getByRole("button");
}

describe("delete state button", () => {
  it("should render", () => {
    const button = displayAndGetButton({}, s => {}, s => <DeleteStateButton id={'someId'} label='someLabel' states={[s.focusOn("a"), s.focusOn("b")]} />);
    expect(button).toHaveAttribute('class', 'button');
    expect(button).toHaveTextContent('someLabel');
  });

  it("should not do anything when 0 deletes and clicked", () => {
    let remembered: any = undefined;
    const button = displayAndGetButton({ a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[]} />);
    fireEvent.click(button);
    expect(remembered).toBeUndefined();
  });

  it("should delete the state when clicked - 1 deletes", () => {
    let remembered: any = {};
    const button = displayAndGetButton({ a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[s.focusOn("a")]} />);
    fireEvent.click(button);
    expect(remembered).toEqual({ b: 2, c: 3 });
  });

  it("should delete the state when clicked - 2 deletes", () => {
    let remembered: any = {};
    const button = displayAndGetButton({ a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[s.focusOn("a"), s.focusOn("b")]} />);
    fireEvent.click(button);
    expect(remembered).toEqual({ c: 3 });
  });
});
