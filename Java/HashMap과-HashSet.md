# HashMap과 HashSet

## HashMap

- (key, value) 쌍을 갖는 자료구조.
- 중복값(= 같은 key)을 허용하지 않는다. python의 딕셔너리와 유사.

---

- 선언

```java
HashMap<Key, Value> map = new HashMap<>();

// key = String, value = Integer
HashMap<String, Integer> map = new HashMap<>();
```

- 값 삽입

```java
map.put(key, value);

// key = "Haylie", value = 25
// 같은 key를 여러번 put하면 마지막으로 put된 값으로 교체된다.
map.put("Haylie", 25);
```

- 값 얻어오기

```java
map.get(key);

map.get("Haylie"); // -> 25, 없으면 null을 반환
```

- 값 얻어오기(2) - 없으면 default

```java
map.getOrDefault(key, default);

// "Haylie"라는 key가 있을 때는 value를 반환하고, key가 없으면 default 값인 1을 반환한다.
map.getOrDefault("Haylie", 1);
```

- 순회

```java
// key 순회
for(String key : map.keySet()) {
    System.out.println(key);
}

// key, value 순회
for(Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println("key = " + entry.getKey() + ", value = " + entry.getValue());
}

// 람다식을 활용한 foreach
map.forEach((key, value) => System.out.println("key = " + key + ", value = " + value));
```

- 정렬

```java
// entry list를 만든 뒤, Collections.sort()로 정렬하자!
List<Map.Entry<String, Genre>> entries = new ArrayList<>(map.entrySet());
Collections.sort(entries, (a, b) -> b.getValue().plays - a.getValue().plays);
```

## HashMap vs HashSet

- 분명 `HashSet`이 `key-value` 쌍이 아닌 단일 값을 저장해서 더 빠를 것 같았는데, 사람들이 `HashSet`보다 `HashMap`이 더 빠르다고 해서 정리함

| 목록           | HashMap                                                   | HashSet                                                                           |
| -------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 정의           | Hash Table로 구현된 Map interface                         | Set(집합)이고, Hash Table을 사용하는 Collection을 저장공간으로 사용함             |
| 구현 Interface | `Map`, `Cloneable`, `Serializable`                        | `Set`, `Cloneable`, `Serializable`, `Itrable`, `Collection`                       |
| 저장           | `key-value` 쌍                                            | `objects(객체)`                                                                   |
| 중복 값 가능?  | 중복 `key`는 `불가능`하지만 중복 `value`는 `가능`         | `불가능`                                                                          |
| `null`값 가능? | key `null`은 1개, value `null`은 여러 개                  | 하나의 `null`만 가능                                                              |
| 삽입 메소드    | `put()`                                                   | `add()`                                                                           |
| 성능           | `value`를 `unique key`로 저장하므로 `HashSet보다 빠르다.` | `HashSet`에 저장된 `objects`는 `hashcode` 계산에 사용되므로 `HashMap보다 느리다.` |
| 객체 개수      | key-value 각각 1개씩, `2개`                               | `1개`                                                                             |
| 저장 방식      | 객체를 저장하는 데에 `hashing`을 사용함                   | 내부에서 `HashMap`을 사용하여 저장함                                              |
| 언제 사용해?   | `key-value` 쌍을 갖는 데이터를 저장할 때                  | `중복값이 없는 데이터`를 저장할 때                                                |

## 참고 사이트

[Difference between HashSet and HashMap class in Java](https://www.javatpoint.com/difference-between-hashset-and-hashmap)
