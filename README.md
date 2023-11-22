# 리액트 + 타입스크립트 (React +TS)

- Udemy 강의 노트 정리한 것 (https://www.udemy.com/course/react-typescript-the-practical-guide/)

* 타입스크립트 기본

  - 타입 추론과 명시적 타입

    ```tsx
    // Type inference

    let userName = "Max";
    let userAge = 34;
    ```

    ```tsx
    // Explicit Type

    let isValid: boolean = true;
    ```

  - 기본 타입 (Primitive Type)
    - string, number, boolean
  - 유니온 타입 (Union Type)
    ```tsx
    let userId: string | number = "abc1";
    ```
  - 오브젝트 타입 (Object Type)

    - ‘object’ 타입이 있지만, 이것은 structure를 보여주지 않음

      ```tsx
      // let user: object;
      let user: {
        name: string;
        age: number;
        isAdmin: boolean;
        id: string | number;
      };

      user = {
        name: "Max",
        age: 22,
        isAdmin: true,
        id: "adwb2",
      };
      ```

  - 배열 타입 (Array Type)

    ```tsx
    let hobbies: Array<string>;
    hobbies = ["Soccer", "Cooking", "Reading"];
    // hobbies = [1, 2];

    let hobbies2: string[];
    hobbies2 = ["Soccer", "Cooking", "Reading"];
    ```

  - functions

    ```tsx
    function add(a: number, b: number): void {
      const result = a + b;
      console.log(result);
    }

    // return type inferred
    function add2(a: number, b: number) {
      const result = a + b;
      return result;
    }

    // Function Type
    function calculate(
      a: number,
      b: number,
      **calcFn: (a: number, b: number) => number**
    ) {
      calcFn(a, b);
    }

    calculate(2, 5, add2);
    ```

  - Custom Type

    ```tsx
    type AddFn = (a: number, b: number) => number;

    function calculate(a: number, b: number, calcFn: AddFn) {
      calcFn(a, b);
    }

    type User = {
      name: string;
      age: number;
      isAdmin: boolean;
      id: string | number;
    };

    let user: User;
    ```

  - Interface

    ```tsx
    interface Credentials {
      password: string;
      email: string;
    }

    let creds: Credentials;

    creds = { password: "adslfk", email: "dmd@gmadlkw.com" };
    ```

  - Interface vs. Custom Type

    - interface is limited to object
    - interface cannot store a union type
    - interface is easy to **extend**

    ```tsx
    // 다음과 같은 경우면 인터페이스가 더 나음
    class AuthCredentials implements Credentials {
      email: string; // required by interface
      password: string; // required by interface
      userName: string;
    }

    function login(credentials: Credentials) {}
    login(new AuthCredentials());
    ```

  - Merging types

    ```tsx
    // type 이용

    type Admin = { permission: string[] };
    type AppUser = { userName: string };
    type AppAdmin = Admin **&** AppUser;
    ```

    ```tsx
    // interface 이용

    interface Admin {
      permission: string[];
    }
    interface AppUser {
      userName: string;
    }
    interface AppAdmin **extends** Admin, AppUser {}
    ```

    ```tsx
    let admin: AppAdmin;
    admin = {
      permission: ["login"],
      userName: "admin",
    };
    ```

  - Literal Type

    ```
    let role: "admin" | "user";

    role = "admin";
    role = "user";
    // role = "editor"; error
    ```

  - Adding type guards
    ```tsx
    function performAction(action: string | number, role: Role) {
      if (role === "admin" && typeof action === "string") {
        // ...
      }
    }
    ```
    - allows TS to do Type Narrowing
      - `typeof` check if type is string, number, booleans, object, function, symbol, or bigint
      - `instanceof` check if an object value is based on some specific class
      - `in operator` check if an object contains a specific property
    - typeof 커스텀 타입 체크는 불가 (TS 기능이라)
  - Generic Type

    - Generic type? works together with another type

    ```tsx
    // 함수 아규먼트의 타입 버전
    type DataStorage<T> = { storage: T[]; add: (data: T) => void };

    const textStorage: DataStorage<string> = {
      storage: [],
      add(data) {
        this.storage.push(data);
      },
    };

    const userStorage: DataStorage<User> = {
      storage: [],
      add(user) {},
    };
    ```

    ```tsx
    // Generic Function

    function merge<T, U>(a: T, b: U) {
      return { ...a, ...b };
    }

    const newUser = merge({ name: "Morgan" }, { age: 54 });
    ```

    -

* 리액트 + 타입스크립트 - 기본

  - 컴포넌트 프롭 타입 정의

    ```tsx
    **type CourseGoalProps = {
      title: string;
      description: string;
    };**

    function CourseGoal(**{ title, description }: CourseGoalProps**) {
      return ();
    }

    export default CourseGoal;
    ```

  - children 프롭 타입

    1. ReactNode 타입을 통해 chlidren을 포함해주거나
    2. PropsWithChildren 타입 내 제네릭 타입만 선언해줘도 됨

    - import { type T } 에서 ‘type’을 둬 production에서는 해당 코드가 필요 없다는 것을 명시해주기

    ```tsx
    import { **type** PropsWithChildren, **type** ReactNode } from "react";

    type CourseGoalProps1 = {
      title: string;
      children: ReactNode;
    };

    type CourseGoalProps2 = PropsWithChildren<{ title: string }>;

    function CourseGoal({ title, children }: CourseGoalProps) {
      return (...);
    }

    export default CourseGoal;
    ```

  - 리액트가 리스트 iterating에 사용하는 key 프롭은 따로 타입으로 지정해주지 않아도 됨
  - 컴포넌트 타입을 지정하는 다른 방법

    ```tsx
    type CourseGoalProps = PropsWithChildren<{ title: string }>;

    const CourseGoal: **FC<CourseGoalProps>** = ({ title, children }) => {
      return (...);
    };

    export default CourseGoal;
    ```

  - useState()

    - useState<T>() 제네릭 타입에 지정

    ```tsx
    type **CourseGoal** = {
      title: string;
      description: string;
      id: number;
    };

    export default function App() {
      const [goals, setGoals] = useState**<CourseGoal[]>([]);**

    	function handleAddGoal() {
        setGoals((prevGoals) => {
          const newGoal: **CourseGoal** = {
            id: Math.random(),
            title: "Learn React + TS",
            description: "Learn it in depth",
          };

          return [...prevGoals, newGoal];
        });
      }

    return (
        <main>
          <Header image={{ src: goalsImg, alt: "A list of goals" }}>
            <h1>Your Course Goals</h1>
          </Header>
          <button onClick={handleAddGoal}>Add Goal</button>
          <ul>
            {goals.map((goal) => (
              <li key={goal.id}>
                <CourseGoal title={goal.title}>
                  <p>{goal.description}</p>
                </CourseGoal>
              </li>
            ))}
          </ul>
        </main>
      );
    }
    ```

  - 프롭으로 함수 넘기기 (프롭 드릴링)

    ```tsx
    // App.tsx

    export default function App() {
      **function handleDeleteGoal(id: number) { ... }**
      return (
           <CourseGoalList goals={goals} **onDeleteGoal={handleDeleteGoal}** />
    	);
    }
    ```

    ```tsx
    // CourseGoalList.tsx

    type CourseGoalListProps = {
      goals: CourseGoalType[];
      **onDeleteGoal: (id: number) => void;**
    };

    export default function CourseGoalList({ goals, **onDeleteGoal** }: CourseGoalListProps) {
    	return (
    	    <ul>
    	      {goals.map((goal) => (
    	        <li key={goal.id}>
    	          <CourseGoal **id={goal.id}** title={goal.title} **onDelete={onDeleteGoal}**>
    	            <p>{goal.description}</p>
    	          </CourseGoal>
    	        </li>
    	      ))}
    	    </ul>
    	  );
    	}
    }
    ```

    ```tsx
    // CourseGoal.tsx

    type CourseGoalProps = PropsWithChildren<{
      id: number;
      title: string;
      **onDelete: (id: number) => void;**
    }>;

    export default function CourseGoal({ **id**, title, children, **onDelete** }: CourseGoalProps) {
      return (
          <button **onClick={() => onDelete(id)}**>Delete</button>
      );
    }
    ```

  - 이벤트, 제네릭 이벤트 타입

    - 이벤트 타입<엘레먼트 타입>
    - 이벤트 핸들링시 어떤 엘레먼트에 대한 어떤 이벤트인지 명시해줘야 함
    - tsconfig.json의 'lib': ['ES2020', 'DOM', 'DOM.Iterable'] 설정 덕분에 일반화된 엘레먼트 타입을 사용할 수 있음 (예: DOM 기반 엘레먼트 (HTMLFormElement))

    ```tsx
    // 어떤 이벤트 타입인지 명시해줘야 함
    export default function NewGoal() {
      **function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();**

    		// form 데이터 추출. 리액트에서는 useRef()사용
    ****		// const form = new FormData(e.currentTarget)
      **}**

      return (
        <form onSubmit={**handleSubmit**}>
          ...
        </form>
      );
    }
    ```

    ```tsx
    // 이 경우 TS가 event 타입을 infer해 주기 때문에 타입을 명시해주지 않아도 됨
    export default function NewGoal() {
      return (
        <form onSubmit={**(e) => {}**}>
          ...
        </form>
      );
    }
    ```

  - useRef()

    - useRef<타겟 요소>(null)
    - 선언시 undefined 타입 에러가 나기 때문에 null 값을 초기값으로 지정해줘야 함
    - 제네릭 타입으로 타게팅하는 요소도 명시해야 함
    - 값을 가져올 때는 ref.current.value로 가져오지만, ref.current가 null일 수 있다며 에러가 남
      - !를 붙여 값을 가져올 때는 null이 아님을 명시
      - 제네릭 타입을 명시하지 않으면 value에서 에러가 남

    ```tsx
    const goal = **useRef<HTMLInputElement>(null);**

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const enteredGoal = **goal.current!.value;**

    		// submit 후 input을 리셋하는 built-in 함수
    		**e.currentTarget.reset();**
    }
    ```

* 리액트 + 타입스크립트 - 컴포넌트

  - Discriminated Unions

    - 특정 프롭(리터럴 타입 e.g. mode)에 대해서만 필수적인 프롭들(e.g. severity)을 명시함으로써 구분하고 싶을 때
      - mode: ‘hint’ / mode: ‘waring’ & severity
    - 보통 옵셔널로 지정하면 분기 기준이 되는 프롭 모두에 대해 옵셔널이 되는 거라 타입이 명확해지지 않음
    - 타입을 명확하게 구분하는 작업인데, DB 설계할 때처럼 옵셔널한 부분을 떼어내 서브 집단으로 구분하고, 집단 내에서는 모두 필수 값을 갖도록 하는 것과 같은 원리인 것 같다.

    ```tsx
    // InfoBox.tsx
    import React, { type PropsWithChildren } from "react";

    type HintBoxProps = PropsWithChildren<{
      mode: "hint";
    }>;

    type WarningBoxProps = PropsWithChildren<{
      mode: "warning";
      severity: "low" | "medium" | "high" | undefined;
    }>;

    type InfoBoxProps = HintBoxProps | WarningBoxProps;

    // type InfoBoxProps = PropsWithChildren<{
    //   mode: "hint" | "warning";
    //   // severity: "low" | "medium" | "high" | undefined;
    //   severity?: "low" | "medium" | "high";
    // }>;

    export default function InfoBox(props: InfoBoxProps) {
      const { children } = props;

      if (props.mode === "hint") {
        return (
          <aside className="infobox infobox-hint">
            <p>{children}</p>
          </aside>
        );
      }

      // TS automatically recognize required conditions in optional conditions
      const { severity } = props;

      return (
        <aside className={`infobox infobox-warning **warning--${severity}**`}>
          <h2>Warning</h2>
          <p>{children}</p>
        </aside>
      );
    }
    ```

  - Wrapper 컴포넌트 w/ ComponentPropsWithoutRef

    - `ComponentPropsWithoutRef` {…props}로 나머지 prop을 알아서 넘기도록 할 때 사용
    - ComponentPropsWithoutRef<’엘레먼트’> 엘레먼트를 지정해줘야 접근 가능

    ```tsx
    **import { type ComponentPropsWithoutRef } from "react";**

    type InputProps = {
      label: string;
      id: string;
    } **& ComponentPropsWithoutRef<"input">;**

    export default function Input({ label, id, **...props** }: InputProps) {
      return (
        <p>
          <label htmlFor={id}>{label}</label>
          <input id={id} **{...props}** />
        </p>
      );
    }
    ```

  - Wrapper 컴포넌트 - 다양한 컴포넌트 리턴하기

    ```tsx
    import React, { type ComponentPropsWithoutRef } from "react";

    type ButtonProps = {
      **el: "button";**
    } & ComponentPropsWithoutRef<"button">;

    type AnchorProps = {
      **el: "anchor";**
    } & ComponentPropsWithoutRef<"a">;

    export default function Button(props: ButtonProps | AnchorProps) {
      // const { el, ...ohterProps } = props; // TS not understnad

      if (props.el === "anchor") {
        return <a **{...props}**></a>;
      }

      return <button >Button</button>;
    }
    ```

    - 그러나 언제나 el을 setting하는 것은 사용성이 안 좋음

  - Type Predicates & TS 한계

    - 프롭이 href를 갖고 있으면 a 엘레먼트라는 로직을 이용해 편리성을 높임

      ```tsx
      // el 사용 하지 않는 방법 -> Type Predicates 이용
      // true를 리턴할 시 arg 타입은 명시된 타입임을 말해줌
      function isAnchorProps(props: ButtonProps | AnchorProps): **props is AnchorProps** {
        **// if (props.href) { // not gonna work! -> use in operator**
        return **"href" in props;**
      }

      export default function Button(props: ButtonProps | AnchorProps) {
        if (**isAnchorProps(props)**) {
          return <a className="button" {...props}></a>;
        }

        return (
          <button className="button" {...props}>
            {props.children}
          </button>
        );
      }
      ```

    - 로직을 더 추가해서 TS가 두 프롭 타입 중 하나를 선택하는 것처럼 보이도록 할 수 있음. 그러나 유니온 타입은 기본적으로 둘을 모두 사용하는 것을 의미하므로 완벽하지 않음
      ```tsx
      type ButtonProps = ComponentPropsWithoutRef<"button"> & {
        **href?: never;**
      };
      type AnchorProps = ComponentPropsWithoutRef<"a"> & {
        **href?: string;**
      };
      ```

  - Polymorphic 컴포넌트 기본

    - ElementType vs. ReactNode
      - name of a component vs. raw text like JSX

    ```tsx
    import React, { type ElementType } from "react";

    // ElementType: a value should be some valid **identifier**, using in JSX, of the component
    **type ContainerProps = {
      as: ElementType;
    };**

    export default function Container({ as }: ContainerProps) {
      const Component = as; // remap the name
      return <Component />;
    }
    ```

  - Polymorphic 컴포넌트 w/ 제네릭 함수

    - Polymorphic 컴포넌트는 보통 컴포넌트 간 스타일링 공유 등에 사용됨

    ```tsx
    import React, {
      type ReactNode,
      type ElementType,
      type ComponentPropsWithoutRef,
    } from "react";

    **type ContainerProps<T extends ElementType> = {
      as?: T;
      children: ReactNode;
    } & ComponentPropsWithoutRef<T>;**

    // Generic Function
    export default function Container**<C extends ElementType>**({
      as,
      children,
      ...props
    }**: ContainerProps<C>**) {
      const Component = **as || "div";** // indicate default
      return <Component className="container" **{...props}**>{children}</Component>;
    }
    ```

  - More Component Ideas
    - [A Card Component That Has Multiple "Slots"](https://github.com/academind/react-typescript-course-resources/blob/main/examples/Card.tsx)
      ```tsx
      <Card
        title="My Card"
        **actions={
          <button onClick={() => console.log('Button clicked!')}>
            Click Me!
          </button>
         }**
        >
        <p>Some content</p>
      </Card>
      ```
    - [A Button Component That Accepts Text & An Icon](https://github.com/academind/react-typescript-course-resources/blob/main/examples/IconButton.tsx)
      ```tsx
      <IconButton **icon={HeartIcon}** onClick={() => console.log('Button clicked!')}>
        **Like**
      </IconButton>
      ```
    - [A Generic List Component](https://github.com/academind/react-typescript-course-resources/blob/main/examples/List.tsx)
      ```tsx
      <main>
        <section>
          <h2>Users</h2>
          <List
            **items={users}**
            **renderItem={(user) => <li key={user.id}>{user.name}</li>}**
          />
        </section>
        <section>
          <h2>Hobbies</h2>
          <List
            items={hobbies}
            renderItem={(hobby) => <li key={hobby}>{hobby}</li>}
          />
        </section>
      </main>
      ```
  - forwardRef

    ```tsx
    import { forwardRef, type ComponentPropsWithoutRef } from "react";

    type InputProps = {
      label: string;
      id: string;
    } & **ComponentPropsWithoutRef**<"input">;

    **const Input = forwardRef<HTMLInputElement, InputProps>(function (
      { label, id, ...props },
      ref
    )** {
      return (
        <p>
          <label htmlFor={id}>{label}</label>
          <input id={id} {...props} ref={ref} />
        </p>
      );
    }**);**

    export default Input;
    ```

    ```tsx
    // App.tsx

    const input = useRef**<HTMLInputElement>**(null);
    ```

  - 로직 공유 (w/ ‘unknown’ & 타입 캐스팅)

    ```tsx
    // Form.tsx

    import React, { type FormEvent, type ComponentPropsWithoutRef } from "react";

    type FormProps = ComponentPropsWithoutRef<"form"> & {
      **// don't know in advance
      onSave: (value: unknown) => void;**
    };

    export default function Form({ **onSave**, children, ...otherProps }: FormProps) {
      function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

    		// form data로 데이터 추출하려면 name 프로퍼티 정의 필요
        **const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);**
        **onSave(data);**
      }

      return (
        <form onSubmit={handleSubmit} {...otherProps}>
          {children}
        </form>
      );
    }
    ```

    ```tsx
    // App.tsx

    import Button from "./components/Button";
    import Form from "./components/Form";
    import Input from "./components/Input";

    function App() {
      **function handleSave(data: unknown) {**
        // as: convert type when better knowing what type is
        **const extractedData = data as { name: string; age: string };
        console.log(extractedData);
      }**

      return (
        <main>
          <Form onSave={**handleSave**}>
            <Input type="text" label="name" id="name" />
            <Input type="number" label="age" id="age" />
            <p>
              <Button>Save</Button>
            </p>
          </Form>
        </main>
      );
    }

    export default App;
    ```

    - 그러나 ‘as’로 타입 캐스팅하는 것은 최대한 지양하는 게 좋음 → Type Narrowing for TS to be able to infer the final type

      ```tsx
      function handleSave(data: unknown) {
        // const extractedData = data as { name: string; age: string };
        if (
          !data ||
          typeof data !== "object" ||
          !("name" in data) ||
          !("age" in data)
        ) {
          return;
        }

        // at this point, TypeScript knows that data MUST BE an object
        // with a name and age property
        // otherwise, the previous if statement would have returned
        console.log(data);
        customForm.current?.clear();
      }
      ```

  - Component API 노출하기 (useImperativeHandle)

    - 외부 컴포넌트가 어떤 컴포넌트의 API를 사용하고 싶을 때 그 API를 노출하는 방법. custom method를 만들어주는 방식

    ```tsx
    // Form.tsx

    import {
      useRef,
      type ComponentPropsWithoutRef,
      type FormEvent,
      useImperativeHandle,
      forwardRef,
    } from "react";

    **export type FormHandle = {
      clear: () => void;
    };**

    type FormProps = ComponentPropsWithoutRef<"form"> & {
      // don't know in advance
      onSave: (value: unknown) => void;
    };

    const Form = **forwardRef<FormHandle, FormProps>**(function (
      { onSave, children, ...otherProps },
      ref
    ) {
      const form = useRef<HTMLFormElement>(null);

      **useImperativeHandle(ref, () => {
        return {
          clear() {
            console.log("Clearing..");
            form.current?.reset();
          },
        };
      });**

      function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);
        onSave(data);
      }

      return (
        <form onSubmit={handleSubmit} {...otherProps} ref={form}>
          {children}
        </form>
      );
    });

    export default Form;
    ```

    ```tsx
    // App.tsx

    import { useRef } from "react";
    import Button from "./components/Button";
    import Form, { FormHandle } from "./components/Form";
    import Input from "./components/Input";

    function App() {
      **const customForm = useRef<FormHandle>(null);**

      function handleSave(data: unknown) {
        ...
        **customForm.current?.clear();**
      }

      return (
        <main>
          <Form onSave={handleSave} **ref={customForm}**>
            <Input type="text" label="name" id="name" />
            <Input type="number" label="age" id="age" />
            <p>
              <Button>Save</Button>
            </p>
          </Form>
        </main>
      );
    }

    export default App;
    ```

* 리액트 + 타입스크립트 - 상태관리 (context, useReducer)

  - 컨텍스트 생성

    ```tsx
    // store/timer-context.tsx

    import React, { createContext } from "react";

    type Timer = {
      name: string;
      duration: number;
    };

    type TimersState = {
      isRunning: boolean;
      timers: Timer[];
    };

    // different components can access to theses values & methods
    **type TimersContextValue = TimersState & {
      addTimer: (timerData: Timer) => void;
      startTimers: () => void;
      stopTimers: () => void;
    };**

    // needs 1 initial value to manage
    **const TimersContext = createContext<TimersContextValue | null>(null);**
    ```

  - 프로바이더 컴포넌트

    - 컨텍스트 생성 후 프로바이더 컴포넌트를 만들어주고, 컨텍스트를 세팅해 줌
    - JSX에서 프로바이더로 감싸주면 하위 컴포넌트들은 ctx에 접근 가능

    ```tsx
    // store/timer-context.tsx

    export default function TimersContextProvider({
      children,
    }: **TimersContextProvider**) {

      **const ctx: TimersContextValue = {
        timers: [],
        isRunning: false,
        addTimer(timerData) {},
        startTimers() {},
        stopTimers() {},
      };**

      return (
        **<TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>**
      );
    }
    ```

    ```tsx
    // App.tsx

    function App() {
      return <TimersContextProvider>...</TimersContextProvider>;
    }

    export default App;
    ```

  - 커스텀 훅으로 컨텍스트 접근 (useContext)

    - null 체크를 한 커스텀 훅으로 감싸 줌

    ```tsx
    const TimersContext = createContext<TimersContextValue | null>(null);

    export function **useTimersContext**() {
      const timersCtx = **useContext**(TimersContext);
      if (timersCtx === null) {
        throw new Error("Timers CTX is null - should be not the case!");
      }
      return timersCtx;
    }
    ```

    ```tsx
    // Header.tsx (consume ctx)

    export default function Header() {
      **const timersCtx = useTimersContext();**

      return (
        <header>
          <h1>ReactTimer</h1>

          <Button>{timersCtx.isRunning ? "Stop" : "Start"} Timers</Button>
        </header>
      );
    }
    ```

  - useReducer()

    - 컨텍스트 프로바이더 컴포넌트에서 상태 관리 로직 넣기

      ```tsx
      **type Action = {
        type: "ADD_TIMER" | "START_TIMERS" | "STOP_TIMERS";
      };**

      **function timersReducer(state: TimersState, action: Action): TimersState {
        ...
      }**

      export default function TimersContextProvider({
        children,
      }: TimersContextProvider) {
        // dispatch fn allows us to trigger state change
        **const [timersState, dispatch] = useReducer(timersReducer, initialState);**

        const ctx: TimersContextValue = {
          timers: [],
          isRunning: true,
          addTimer(timerData) {
            dispatch({ type: "ADD_TIMER" });
          },
          startTimers() {
            dispatch({ type: "START_TIMERS" });
          },
          stopTimers() {
            dispatch({ type: "STOP_TIMERS" });
          },
        };

        return (
          <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
        );
      }
      ```

    - 리듀서 로직 작성 & payload setting

      ```tsx
      // Discriminated union for type safety
      type StartTimersAction = {
        type: "START_TIMERS";
      };

      type StopTimersAction = {
        type: "STOP_TIMERS";
      };
      type AddTimersAction = {
        type: "ADD_TIMER";
        **payload: Timer;**
      };

      type Action = StartTimersAction | StopTimersAction | AddTimersAction;

      function timersReducer(state: TimersState, action: Action): TimersState {
        if (action.type === "START_TIMERS") {
          // don't manipulate data diretly
          return {
            ...state,
            isRunning: true,
          };
        }

        if (action.type === "STOP_TIMERS") {
          // don't manipulate data diretly
          return {
            ...state,
            isRunning: false,
          };
        }

        if (action.type === "ADD_TIMER") {
          // don't manipulate data diretly
          return {
            ...state,
            timers: [
              ...state.timers,
              {
                name: action.payload.name,
                duration: action.payload.duration,
              },
            ],
          };
        }

        return state;
      }
      ```

    - 리듀서 함수로 상태 변경

      ```tsx
      // Provider

      **const [timersState, dispatch] = useReducer(timersReducer, initialState);**

      const ctx: TimersContextValue = {
          **timers: timersState.timers,
          isRunning: timersState.isRunning,**
          addTimer(timerData) {
            dispatch({ type: "ADD_TIMER", **payload: timerData** });
          },
          startTimers() {
            dispatch({ type: "START_TIMERS" });
          },
          stopTimers() {
            dispatch({ type: "STOP_TIMERS" });
          },
        };
      ```

* 리액트 + 타입스크립트 - useEffect

  - useEffect()

    - useState의 state각 바뀌면 컴포넌트는 리렌더링 됨.
    - 성능을 위해 리렌더링과 관계 없는 로직은 사이드 이벡트로 취급하여 useEffect()를 사용해야 함

    ```tsx
    export default function Timer({ duration, name }: TimerProps) {
      const [remainingTime, setRemainingTime] = useState(duration * 1000);

      // **inifinite loop -> side effect!**
      // setInterval(() => {
      //   setRemainingTime((prevTime) => prevTime - 50);
      // }, 50);

      **// runs after component function execute
      useEffect(() => {
        setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 50);
        }, 50);
      }, []);**

      return (
        <Container as="article">
          <h2>{name}</h2>
          <p>
            <progress max={duration * 1000} value={remainingTime} />
          </p>
          <p>{formattedRemainingTime}</p>
        </Container>
      );
    }
    ```

  - Refs로 인터벌 관리 & 클린업 함수

    ```tsx
    export default function Timer({ duration, name }: TimerProps) {
      **const interval = useRef<number | null>(null);**
      const [remainingTime, setRemainingTime] = useState(duration * 1000);

      **if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current);
      }**

      // 컴포넌트가 unmount될 때 인터벌을 클린업하지 않으면
      // Strict 모드에서 속도가 2배 더 빨라짐 (인터벌 함수가 2번 실행되므로)
      // 리턴 값에 클린업 함수를 지정하면, useEffect가 다시 실행되기 전 혹은 컴포넌트가 unmount(DOM에서 제거되는 시점) 되기 전에 클린업 함수가 실행됨
      **useEffect(() => {
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 50);
        }, 50);**

        // useEffect 밖에서 제어하기 위해 readonly 값인 ref 활용
        **interval.current = timer;

        return () => clearInterval(timer);
      }, []);**

      const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

      return (
        <Container as="article">
          <h2>{name}</h2>
          <p>
            <progress max={duration * 1000} value={remainingTime} />
          </p>
          <p>{formattedRemainingTime}</p>
        </Container>
      );
    }
    ```

  - useEffect() & dependency array

    ```tsx
    const { **isRunning** } = useTimersContext();

    useEffect(() => {
        let timer: number;
        if (**isRunning**) {
          timer = setInterval(() => {
            setRemainingTime((prevTime) => {
              if (prevTime <= 0) {
                return prevTime;
              }
              return prevTime - 50;
            });
          }, 50);
          interval.current = timer;
        } else if (interval.current) {
          clearInterval(interval.current);
        }
        return () => clearInterval(timer);
      }, [**isRunning**]);
    ```

* 리액트 + 타입스크립트 - 데이터 fetching (zod 공부하기)

  - 유틸리티 get 함수

    ```tsx
    // util/http.ts

    export async function get(url: string) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

    	// zod 같은 라이브러리를 쓰는 게 좋음
      // unknown은 any 보단 더 type safe
      const data = (await response.json()) **as unknown;**
    	return data;
    }
    ```

  - 데이터 가져오기 & 변형

    - Dummy data 가져오기: jsonplaceholder ([https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/))
    - useEffect 훅에서 비동기 함수를 실행하려면, 내부에 비동기 함수를 먼저 정의한 후 그것을 실행하면 됨

      ```tsx
      // App.ttsx

      **type RawDataBlogPost = {
        id: number;
        title: string;
        body: string;
        userId: number;
      };**

      function App() {
        **const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();**

        **useEffect(() => {
          async function fetchPosts() {

      			// fetch data
            const data = (await get(
              "https://jsonplaceholder.typicode.com/posts"
            )) as RawDataBlogPost[];

            // conversion
            const blogPosts: BlogPost[] = data.map((rawPost) => {
              return {
                id: rawPost.id,
                title: rawPost.title,
                text: rawPost.body,
              };
            });

      			// state change
            setFetchedPosts(blogPosts);
          }

          fetchPosts();
        }, []);**

      	**// null check 후 컴포넌트 렌더링**
        **let content: ReactNode;
        if (fetchedPosts) {
          content = <BlogPosts posts={fetchedPosts} />;
        }**

        return (
          <main>
            <img src={fetchingImg} alt="an abstract image" />
            **{content}**
          </main>
        );
      }

      export default App;
      ```

  - 대안: zod

    ```tsx
    import { z } from "zod";

    const rawDataBlogPostSchema = z.object({
      id: z.number(),
      userId: z.number(),
      title: z.string(),
      body: z.string(),
    });

    // 스키마에 따라 validation
    // someDataa가 any나 unknown 타입이라도, TS가 parsedData를 known type으로 추론 가능
    const parsedData = rawDataBlogPostSchema.parse(someData);
    ```

    ```tsx
    // 위 예제

    import { z } from "zod";
    // other imports ...

    // outside of App component function (since this doesn't need to be re-created all the time)
    const rawDataBlogPostSchema = z.object({
      id: z.number(),
      userId: z.number(),
      title: z.string(),
      body: z.string(),
    });
    // z.array() is a Zod method that creates a new schema based on another schema
    // as the name suggests, it's simply an array containing the expected objects
    const expectedResponseDataSchema = z.array(rawDataBlogPostSchema);

    function App() {
      // other code like useState() etc ...

      useEffect(() => {
        async function fetchPosts() {
          setIsFetching(true);
          try {
            const data = await get(
              "https://jsonplaceholder.typicode.com/posts"
            );
            const parsedData = expectedResponseDataSchema.parse(data);
            // No more type casting via "as" needed!
            // Instead, here, TypeScript "knows" that parsedData will be an array
            // full with objects as defined by the above schema
            const blogPosts: BlogPost[] = parsedData.map((rawPost) => {
              return {
                id: rawPost.id,
                title: rawPost.title,
                text: rawPost.body,
              };
            });
            setFetchedPosts(blogPosts);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            }
            // setError('Failed to fetch posts!');
          }

          setIsFetching(false);
        }

        fetchPosts();
      }, []);

      // other code ...
    }
    ```

  - 대안: 제네릭 타입 이용

    ```tsx
    export async function get<**T**>(url: string) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch data.');
      }

      const data = await response.json() as unknown;
      return **data as T;**
    }

    const data = await **get<RawDataBlogPost[]>**(
      'https://jsonplaceholder.typicode.com/posts'
    );
    ```

    ```tsx
    // zod와 함께 사용도 가능

    import { z } from "zod";

    export async function get<T>(url: string, zodSchema: z.ZodType<T>) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = (await response.json()) as unknown;

      try {
        return zodSchema.parse(data);
      } catch (error) {
        throw new Error("Invalid data received from server.");
      }
    }

    ///////////////////

    import { z } from "zod";

    const rawDataBlogPostSchema = z.object({
      id: z.number(),
      userId: z.number(),
      title: z.string(),
      body: z.string(),
    });

    const data = await get(
      "https://jsonplaceholder.typicode.com/posts",
      z.array(rawDataBlogPostSchema)
    );

    data[0].userId; // works => TypeScript knows that userId will exist on the returned data
    ```

  - 에러 핸들링

    ```tsx
    function App() {
      const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
      const [isFetching, setIsFetching] = useState(false);
      **const [error, setError] = useState<string>();**

      useEffect(() => {
        async function fetchPosts() {
          setIsFetching(true);

          **try {**
            const data = (await get(
              "https://jsonplaceholder.typicode.com/posts"
            )) as RawDataBlogPost[];

            // conversion
            const blogPosts: BlogPost[] = data.map((rawPost) => {
              return {
                id: rawPost.id,
                title: rawPost.title,
                text: rawPost.body,
              };
            });

            setFetchedPosts(blogPosts);
          **} catch (error) {**
            **if (error instanceof Error) {
              setError(error.message);
            }
            setError("Failed to fetch posts!");
          }**

          setIsFetching(false);
        }

        fetchPosts();
      }, []);

      let content: ReactNode;

      **if (error) {
        content = <ErrorMessage text={error} />;
      }**

      if (fetchedPosts) {
        content = <BlogPosts posts={fetchedPosts} />;
      }

      if (isFetching) {
        content = <p id="loading-fallback">Fetching posts...</p>;
      }
    ...
    ```

* 리액트 + 타입스크립트 - 리덕스 (TBD)
  - 리덕스 세팅
  - 리덕스 스토어 & 슬라이스
  - 상태 타입 세팅
  - 리듀서 & 액션 페이로드 타입 제어
  - 리듀서에 로직 더하기
  - 리덕스 스토어
  - 액션 디스패치 & useDispatch 훅 조정
  - 타입 세이프한 useSelector 훅 만들기
  - 리덕스 스토어 데이터 선택 & 변형
* interface vs. type
  - interface가 타입 체크는 빠르지만 object, function만 가능
  - 둘 중 하나를 일관적으로 사용하는 게 중요
  - interface는 상속, 선언적 머징이 특징
  - predictability가 더 필요할 때 type을 기본으로 사용, interface는 저런 특징이 필요할 때만 사용하는 게 좋다
    [https://www.youtube.com/watch?v=zM9UPcIyyhQ](https://www.youtube.com/watch?v=zM9UPcIyyhQ)
