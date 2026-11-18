import { useReducer } from "react";

type State = {
    count: number;
};

type Action =
    | { type: "increment" }
    | { type: "decrement" }
    | { type: "reset" };

const initialState: State = {
    count: 0,
};

// useReducer یکی از Hookهای React برای مدیریت State است و جایگزینی برای useState محسوب می‌شود.

// زمانی از آن استفاده می‌کنم که منطق تغییر State پیچیده باشد، چندین State مرتبط داشته باشم یا تغییر یک State به مقدار قبلی آن وابسته باشد.

// useReducer دو ورودی اصلی می‌گیرد:
// - reducer: تابعی که State فعلی و Action را دریافت می‌کند و State جدید را برمی‌گرداند.
// - initialState: مقدار اولیه State.
// و دو مقدار برمی‌گرداند:
// - state: وضعیت فعلی.
// - dispatch: برای ارسال Action به Reducer.

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "increment":
            return {
                count: state.count + 1,
            };

        case "decrement":
            return {
                count: state.count - 1,
            };

        case "reset":
            return initialState;

        default:
            return state;
    }
}

export default function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>

            <button onClick={() => dispatch({ type: "increment" })}>
                Increment
            </button>

            <button onClick={() => dispatch({ type: "decrement" })}>
                Decrement
            </button>

            <button onClick={() => dispatch({ type: "reset" })}>
                Reset
            </button>
        </div>
    );
}