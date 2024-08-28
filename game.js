import chalk from 'chalk';
import readlineSync from 'readline-sync';

export const wait = (delay) => new Promise((res) => setTimeout(res, delay)); // 딜레이 함수

class Player {
  constructor() {
    this.hp = 100;
    this.maxhp = 100;
    this.att = 15;
    this.maxatt = 20;
  }

  attack() {
    return Math.floor(Math.random() * (this.maxatt - this.att + 1)) + this.att;
    // 플레이어의 공격
  }

  stageAbility(stage) {
    this.hp += (stage - 1) * 30;
    this.att += (stage - 1) * 3;
    this.maxatt += (stage - 1) * 3;
  }
}
class Monster {
  constructor() {
    this.hp = 100;
    this.maxhp = 100;
    this.att = 10;
    this.maxatt = 15;
  }

  attack() {
    return Math.floor(Math.random() * (this.maxatt - this.att + 1)) + this.att;
  }
  stageAbility(stage) {
    this.hp += (stage - 1) * 20;
    this.att += (stage - 1) * 2;
    this.maxatt += (stage - 1) * 2;
    // 몬스터의 공격
  }
}

function displayStatus(stage, player, monster) {
  console.log(
    chalk.magentaBright(
      `\n============================== Current Status ==================================`,
    ),
  );
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(
        `| 플레이어 정보 : 체력 : ${player.hp} `,
        `| 공격력 ${player.att}~${player.maxatt}`,
      ) +
      chalk.redBright(
        `| 몬스터 정보 : 체력 : ${monster.hp}`,
        `| 공격력 ${monster.att}~${monster.maxatt}`,
      ),
  );
  console.log(
    chalk.magentaBright(
      `===============================================================================\n`,
    ),
  );
}

const battle = async (stage, player, monster) => {
  let logs = [];

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    console.log('두둥. 몬스터 등장!');
    logs.forEach((log) => console.log(log));
    console.log(chalk.green(`\n1. 공격한다 2.연속공격 3.도망 4.회복 `));
    async function battleInput() {
      const choice = readlineSync.question('당신의 선택은? ');

      switch (choice) {
        case '1':
          const attP = player.attack();
          const attM = monster.attack();
          monster.hp -= attP;
          player.hp -= attM;
          break;
        case '2':
          const douatt = Math.floor(Math.random() * 101);
          if (douatt <= 50) {
            logs.push(chalk.red('연속공격 성공!'));
            const attP = player.attack();
            monster.hp -= attP;
          } else {
            const attM = monster.attack();
            player.hp -= attM;
            logs.push(chalk.red('연속공격 실패!'));
          }
          break;
        case '3':
          const run = Math.floor(Math.random() * 101);
          if (run <= 50) {
            monster.hp = 0;
            logs.push(chalk.red('도망에 성공하셨습니다. 다음 스테이지로 이동합니다.'));
          } else {
            const attM = monster.attack();
            player.hp -= attM;
            logs.push(chalk.red('도망에 실패해 데미지를 입었습니다.'));
          }

          break;
        case '4':
          const heal = Math.floor(Math.random() * 101);
          if (heal <= 50) {
            player.hp += 20;
            logs.push(chalk.blue('회복에 성공하셨습니다 체력 20을 회복합니다.'));
          } else {
            player.hp -= 5;
            logs.push(chalk.red('회복에 실패해 데미지를 입었습니다.'));
          }
          break;
      }
    }

    await battleInput();
  }
  if (player.hp <= 0) {
    console.log(chalk.red('플레이어가 죽었습니다. 게임을 종료합니다.'));
    await wait(0);
    process.exit();
  } else if (monster.hp <= 0) {
    readlineSync.question(
      '스테이지를 클리어하셨습니다.! Enter키 입력 시 다음 스테이지로 이동합니다.',
    );
  } else {
  }
  // 플레이어의 선택에 따라 다음 행동 처리
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    player.stageAbility(stage);
    monster.stageAbility(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    stage++;

    console.log(chalk.blackBright('모든 스테이지를 클리어하셨습니다. 플레이해주셔서 감사합니다.'));
  }
  return;
}
