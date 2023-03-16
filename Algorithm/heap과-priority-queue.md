# Heap과 Priority Queue

> 맨날 문제 풀 때 힙을 이해할 생각도 안 하면서 STL로 `PriorityQueue<int>` 아쥬 날먹해서 정리한다^^..

## 힙(Heap)이란?

- 완전 이진 트리 (Completed Binary Tree)
- 모든 노드에 저장된 값(우선순위)은 자식 노드의 우선순위보다 크거나 같다.
  - 균형 트리가 아니다! 쫄지 말자 (AVL트리의 공포가..)
  - 힙은 **최대, 최소값만 빠르게 보기 위해서** 존재하기 때문에 모든 원소를 균형 트리처럼 정렬하지 않아도 된다. (직접 연결된 부모 - 자식만 비교한다.)
    - 그래서 왼쪽 자식보다 오른쪽 자식이 더 우선순위가 높을 수 있음!
- 배열이나 연결 리스트로 구현하면 안 되나?
  - 둘 다 삭제는 `O(1)`인데
  - 배열: 삽입 위치 접근은 쉬워도 삽입 후 인덱스들을 전부 당겨야 함. 최악 `O(n)`
  - 연결 리스트: 중간 위치를 찾으려면 순차적으로 살펴봐야 함. 최악 `O(n)`
  - 반면에 트리는 비교연산은 `logN`회, 삽입·삭제 모두 `O(log2N)`이라 배열, 연결 리스트보다 평균적으로 더 이득임.
- 구현은 어떻게 하는가?
  - **배열**로!
  - 완전 이진 트리니까 배열로 구현하면 공간복잡도 부분에서 이득

## C++ MaxHeap 구현 예제

```C++
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>

#define MAX_N 100001

int N, cnt;
int maxHeap[MAX_N];

void insert(int value) {
	// 힙의 맨 마지막에 원소를 추가하고 부모와 비교
	int idx = ++cnt;

	// 루트에 도달할 때까지 우선순위를 만족하는지 확인.
	// 부모보다 우선순위가 더 크면 부모와 swap
	while ((idx > 1) && value > maxHeap[idx >> 1]) {
		maxHeap[idx] = maxHeap[idx >> 1];
		idx = idx >> 1;
	}

	// 실제로는 swap 과정은 필요 없고
	// 우선순위가 높으면 부모를 자식 자리에 끌어온 뒤
	// 최종 위치에 insert할 값을 넣으면 됨
	maxHeap[idx] = value;
}

void remove() {
	// 힙은 무조건 루트만 삭제
	// 가장 마지막 값을 루트로 올린 후 힙을 정렬함
	int value = maxHeap[cnt--];
	int parent = 1;
	int child = 2;

	// 힙의 끝에 다다를 때까지 우선순위를 비교
	while (child <= cnt) {
		// 힙은 균형 트리가 아님. 따라서 오른쪽 자식이 왼쪽 자식보다 우선순위가 더 높다면 해당 방향으로 진행함
		if ((child < cnt) && maxHeap[child] < maxHeap[child + 1]) child++;
		// 우선순위를 만족했다면 종료하고, 만족 안 됐다면 부모와 자식을 swap
		if (maxHeap[child] <= value) break;

		maxHeap[parent] = maxHeap[child];
		parent = child;
		child = child << 1;
	}

	// 마찬가지로 실제로 swap하기보다는 최종 위치 parent만 찾아서
	// 그 자리에 미리 찾아놨던 마지막 값을 넣는다
	maxHeap[parent] = value;
}

int pop() {
	if (cnt == 0) return 0;
	int value = maxHeap[1];
	remove();

	return value;
}

int main() {
	scanf("%d", &N);
	cnt = 0;

	int input = 0;
	for (int i = 0; i < N; i++) {
		scanf(" %d", &input);

		if (input == 0) printf("%d\n", pop());
		else insert(input);
	}

	return 0;
}
```
