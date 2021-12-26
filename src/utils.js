export const questions = [
  { id: 'Q1',
    title: '實作 Fibonacci number (費式數列)',
    content: `建立函式 fibonacci 代入參數 position,position 表示的是想要得到 fibonacci sequence 中的第幾個數字的值。
    fibonacci(0) // 0
    fibonacci(1) // 1
    fibonacci(2) // 1
    fibonacci(3) // 2
    fibonacci(4) // 3`,
    answers: [
      { title: 'Method 1: For Loop',
        content: `
        function fibonacci(n) {
          const numbers = [];
        
          for (let i = 0; i <= n; i++) {
            if (numbers[i - 1] === undefined || numbers[i - 2] === undefined) {
              numbers.push(i);
              continue;
            }
            numbers.push(numbers[i - 1] + numbers[i - 2]);
          }
          
          if (n < 2) return numbers[n];
          else return numbers[n - 1] + numbers[n - 2];
        }
        `,
      }, {
        title: 'Method 2: Golden Ratio',
        content: `
        function fibonacci (n) {
          const goldenRatio = 1.618034;
          const numbers = []
        
          for (let i = 0; i <= n; i++) {
            if (i < 2) {
              numbers.push(i)
              continue;
            }
        
            if (i === 2) { // to prevent rounding errors
              numbers.push(1);
              continue;
            }
        
            numbers.push(Math.round(numbers[i - 1] * goldenRatio));
          }
        
          if (n < 2) return numbers[n];
          else return numbers[n - 1] + numbers[n - 2];
        }
        `
      }, {
        title: 'Method 3: Recursion',
        content: `
        function fibonacci (n) {
          if (n < 2) return n;
          else return fibonacci(n - 1) + fibonacci(n - 2);
        }
        `,
      }
    ],
  }, {
    id: 'Q2',
    title: '使用 Linked List 實作 Stack',
    content: `實作需包含以下方法。
      push() : 添加新元素。
      pop():移除元素並返回被移除的元素。
      size():返回所有元素數量。
      const myStack = new Stack()
      myStack.push(1)
      myStack.push(2)
      myStack.push(3)
      myStack.pop() // 3
      myStack.size() // 2`,
    answers: [
      { title: 'Linked List with Push, Pop, Size',
        content: `
        class Node {
          constructor(data) {
            this.data = data;
            this.next = null;
          }
        }
        
        class Stack {
          constructor(head = null) {
            this.head = head;
          }
          
          push(node) {
            const newNode = new Node(node);
        
            if (!this.head) {
              this.head = newNode;
              return;
            }
            
            let currentNode = this.head;
        
            while(currentNode.next) {
              currentNode = currentNode.next;
            }
        
            currentNode.next = newNode;
          }
        
          pop() {
            if (!this.head) return undefined; 
        
            let currentNode = this.head;
            let previousNode;
        
            while(currentNode.next) {
              previousNode = currentNode;
              currentNode = currentNode.next;
            }
        
            previousNode.next = null;
        
            return currentNode;
          }
        
          size() {
            let count = 0;
            let currentNode = this.head;
            
            while (currentNode) {
              count++;
              currentNode = currentNode.next;
            }
            
            return count;
          }
        }
        `
      }
    ]
  }, {
    id: 'Q3',
    title: '實作 Data Transformer',
    content: `將下列輸入資料整合成期望的輸出結果。
  
    輸入資料:
      const userIds = ["U01", "U02", "U03"]
      const orderIds = ["T01", "T02", "T03", "T04"]
      const userOrders = [
        { userId: "U01", orderIds: ["T01", "T02"] },
        { userId: "U02", orderIds: [] },
        { userId: "U03", orderIds: ["T03"] },
      ]
      const userData = { "U01": "Tom", "U02": "Sam", "U03": "John" }
      const orderData = {
        "T01": { name: "A", price: 499 },
        "T02": { name: "B", price: 599 },
        "T03": { name: "C", price: 699 },
        "T04": { name: "D", price: 799 },
      }

    輸出結果:
      const result = [{
        user: { id: ‘U01’, name: ‘Tom’ },
        orders: [
          { id: ‘T01’, name: ‘A’, price: 499 },
          { id: ‘T02’, name: ‘B’, price: 599 },
        ]
      }]`,
    answers: [
      { title: 'Method 1: Array Methods',
        content: `
        const result = userOrders.reduce((acc, userOrderObj) => {
          const { userId, orderIds } = userOrderObj;
          
          return [...acc, {
            user: {
              id: userId,
              name: userData[userId],
            },
            orders: orderIds.map(orderId => ({
              id: orderId,
              ...orderData[orderId],
            }))
          }]
        }, [])
        `,
      }, {
        title: 'Method 2: For Loops',
        content: `
        function transformData(data) {
          const result = [];
        
          for (let i = 0; i < data.length; i++) {
            const { userId, orderIds } = data[i];
        
            const ordersArr = [];
        
            for (let j = 0; j < orderIds.length; j++) {
              ordersArr.push({
                id: orderIds[j],
                ...orderData[orderIds[j]],
              })
            }
        
            result.push({
              user: {
                id: userId,
                name: userData[userId]
              },
              orders: ordersArr,
            })
          }
        
          return result;
        }
        
        const result = transformData(userOrders);
        `
      }
    ]
  }, {
    id: 'Q4',
    title: '擇一實作 Debounce 或 Throttle',
    content: `debounce 是在 delay 時間內如果重新觸發會取消前一次並保留當下觸發的執行。\nthrottle 在觸發後的 timeout 時間內只會執行一次。\n建立函式 debounce 或 throttle 帶入參數如下範例:
    
    const debounceFunc = debounce(func, delay)
    const throttleFunc = throttle(func, timeout)`,
    answers: [
      { title: 'Throttling',
        content: `
        const func = async () => {
          return await new Promise((resolve) => setTimeout(() => resolve('result')));
        }
        
        const throttle = (func, timeout) => {
          let isThrottling = false;
          
          return function() {
            if(!isThrottling) {
              isThrottling = true;
              func();
              setTimeout(() => {
                isThrottling = false;
              }, timeout);
            }
          }
        }
        
        const throttleFunc = throttle(func, 1000);
        `
      }
    ],
  }, {
    id: 'Q5',
    title: '(加分題) 使用 Event Loop 結合實際操作範例擇一敘述 Debounce 或 Throttle 的運作方式',
    content: '如文字輸入、scroll 操作與 button 連續點擊,或是其他可結合 Debounce 或 Throttle的行為都可以拿來當作操作範例。',
  }, {
    id: 'Q6',
    title: '(加分題) 實作 React Custom hook',
    content: `使用 Create React App 架設,請依照下列登入畫面範例完成 useForm 實作。\n當有 errors 時 handleSubmit 要被 by pass。`,
    answers: [
      { title: 'useForm Custom Hook',
        content: `
        const useForm = (data) => {
          const [values, setValues] = useState(data.initialValues);
          const [errors, setErrors] = useState({});

          const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            
            setValues({
              ...values,
              [name]: type === 'checkbox' ? checked : value,
            })
          }

          const handleSubmit = (e) => {
            e.preventDefault();
            const errors = data.validation(values);
            setErrors(errors);
            
            if (Object.values(errors).length === 0) {
              data.onSubmit(values);
              alert("Login Success");
            }
          }
          
          return { handleChange, handleSubmit, values, errors };
        }
        `
      }
    ]
  }
]
