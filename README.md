# 리액트 + 타입스크립트 (React +TS)

- 타입스크립트 기본
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
  - Literal Types
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
- 리액트 + 타입스크립트 - 기본
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
- 리액트 + 타입스크립트 - 복잡한 컴포넌트
  -
- interface vs. type
  - interface가 타입 체크는 빠르지만 object, function만 가능
  - 둘 중 하나를 일관적으로 사용하는 게 중요
  - interface는 상속, 선언적 머징이 특징
  - predictability가 더 필요할 때 type을 기본으로 사용, interface는 저런 특징이 필요할 때만 사용하는 게 좋다
  [https://www.youtube.com/watch?v=zM9UPcIyyhQ](https://www.youtube.com/watch?v=zM9UPcIyyhQ)
