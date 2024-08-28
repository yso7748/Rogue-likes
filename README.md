![](https://velog.velcdn.com/images/yso7748/post/69d99b87-cc04-423e-b2e7-a5340395284c/image.PNG)
콘솔에서 server 파일을 실행시킨 화면입니다 . 스켈레톤 코드로 내주신 server 파일은 아예 건드리지 않고 진행했습니다.

![](https://velog.velcdn.com/images/yso7748/post/13f36806-d6d0-4e8c-a942-c6fa5986b846/image.PNG)

먼저 눈여겨 보실부분은 공격 클래스 메서드 입니다.
과제로 Math.random()은 사용해보라고 하셨기 때문에 구현해봤습니다.

![](https://velog.velcdn.com/images/yso7748/post/e85ab409-075e-491a-8edc-9074600b77fa/image.PNG)
다음 부분은 swicth조건문을 사용 하여 player의 행동에 대한 로직을 처리해봤습니다.

총 선택은 4가지이며 (1.공격, 2.연속공격, 3.도망 ,4.회복)입니다.
### 1. 공격
 각각 player와 monster가 데미지를 주고 받습니다.

### 2.연속공격
60프로의 확률로 공격성공시 player가 monster에게 2배의 데미지를 주지만 
실패시 몬스터의 공격력만큼 데미지를 입게 됩니다.

### 3. 도망
5프로의 확률로 도망에 성공시 스테이지가 바로 클리어 됩니다 .
하지만 실패시 몬스터의 공격력만큼 데미지를 입게 됩니다.

### 4.회복
30프로 확률로 성공시 20만큼 체력을 회복합니다 .하지만 실패시 약 5만큼에 데미지를 입게됩니다.

![](https://velog.velcdn.com/images/yso7748/post/f8d52db2-61fb-43bb-9b3b-73b5687f90bb/image.PNG)
다음 부분입니다 . 스위치 조건문이 종료 되었다는 것은 player나 monster 중에 죽었다는 뜻이기 때문에 만약 player.hp가 0보다 작거나 같으면 플레이어를 사망처리 하였고 그게 아닌 
monster.hp가 0보다 작거나 같으면 스테이지를 클리어 했다는 글자가 콘솔로 입력되게끔 설정해줬습니다.

![](https://velog.velcdn.com/images/yso7748/post/9f87101c-2c27-4bf0-99b2-7c0bb05d4250/image.PNG)

마지막 startGame 부분입니다 .
이미지를 보시면 스테이지를 시작할때마다 player와 monster의 객체를 각각생성해줍니다.
