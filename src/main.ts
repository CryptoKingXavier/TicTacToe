document.addEventListener("DOMContentLoaded", (): void => {
  const section_state: string[] = ["X", "O"];

  const generateRandomIdx = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const check_wins = (section: HTMLElement[]): string => {
    if (
      section[0].innerHTML === section[1].innerHTML &&
      section[0].innerHTML === section[2].innerHTML &&
      section[1].innerHTML === section[2].innerHTML &&
      section_state.includes(section[0].innerHTML) &&
      section_state.includes(section[1].innerHTML) &&
      section_state.includes(section[2].innerHTML)
    )
      return "Win!";
  };

  // Rows & Columns Registry
  const r1_c1: HTMLElement | null = document.getElementById("r1-c1");
  const r1_c2: HTMLElement | null = document.getElementById("r1-c2");
  const r1_c3: HTMLElement | null = document.getElementById("r1-c3");
  const r2_c1: HTMLElement | null = document.getElementById("r2-c1");
  const r2_c2: HTMLElement | null = document.getElementById("r2-c2");
  const r2_c3: HTMLElement | null = document.getElementById("r2-c3");
  const r3_c1: HTMLElement | null = document.getElementById("r3-c1");
  const r3_c2: HTMLElement | null = document.getElementById("r3-c2");
  const r3_c3: HTMLElement | null = document.getElementById("r3-c3");

  // States Interface
  interface StateInterface {
    row_1: HTMLElement[];
    row_2: HTMLElement[];
    row_3: HTMLElement[];
    col_1: HTMLElement[];
    col_2: HTMLElement[];
    col_3: HTMLElement[];
    ldiag: HTMLElement[];
    rdiag: HTMLElement[];
  }

  // States Registry
  const State: StateInterface = {
    row_1: [r1_c1, r1_c2, r1_c3],
    row_2: [r2_c1, r2_c2, r2_c3],
    row_3: [r3_c1, r3_c2, r3_c3],
    col_1: [r1_c1, r2_c1, r3_c1],
    col_2: [r1_c2, r2_c2, r3_c2],
    col_3: [r1_c3, r2_c3, r3_c3],
    ldiag: [r1_c1, r2_c2, r3_c3],
    rdiag: [r1_c3, r2_c2, r3_c1],
  };

  const all_state: HTMLElement[] = State.row_1
    .concat(State.row_2)
    .concat(State.row_3)
    .concat(State.col_1)
    .concat(State.col_2)
    .concat(State.row_3)
    .concat(State.ldiag)
    .concat(State.rdiag);

  let winner: boolean = false;

  // Winning Checker
  const win_checker = (section: HTMLElement[]): void => {
    if (check_wins(section) === "Win!") {
      section.forEach((position) => {
        position.style.backgroundColor = "crimson";
        position.style.color = "snow";
      });
      winner = true
      setTimeout(() => location.reload(), 3000);
    }
  };

  // Automated Winning Checker
  const auto_check_wins = () =>
    setInterval(() => {
      win_checker(State.row_1);
      win_checker(State.row_2);
      win_checker(State.row_3);
      win_checker(State.col_1);
      win_checker(State.col_2);
      win_checker(State.col_3);
      win_checker(State.ldiag);
      win_checker(State.rdiag);
    }, 1000);

  // Mapping Click Functionality
  const positions: (HTMLElement | null)[] = [
    r1_c1,
    r1_c2,
    r1_c3,
    r2_c1,
    r2_c2,
    r2_c3,
    r3_c1,
    r3_c2,
    r3_c3,
  ];

  
  let available_slots: (HTMLElement | null)[] = positions;
  
  positions.map((position) => {
    position.onclick = (): void => {
      if (section_state.includes(position.innerHTML)) {
        console.warn("Player: Position Taken!");
      } else {
        position.innerHTML = "X";
        available_slots.splice(available_slots.indexOf(position), 1);
      }
      
      let computer_choice: HTMLElement = available_slots[generateRandomIdx(0, available_slots.length)];
       
      do {
        computer_choice = available_slots[generateRandomIdx(0, available_slots.length-1)]
      } while (computer_choice.innerHTML === "X")
      
      computer_choice.innerHTML = "O";
      available_slots.splice(available_slots.indexOf(computer_choice), 1);
      auto_check_wins();
    };
  });

  setInterval(() => {
    if (available_slots.length == 0 && !winner) {
      setTimeout(() => location.reload(), 1550)
    }
  }, 1000)
});
