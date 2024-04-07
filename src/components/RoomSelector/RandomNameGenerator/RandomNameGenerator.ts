//chat gpt가 해줌.
const generateRandomName = () => {
  // 각 카테고리별로 가능한 단어들의 배열
  const adjectives = ['lovely', 'quiet', 'bright', 'serene', 'cozy', 'warm', 'peaceful', 'mystic', 'lively', 'sleepy'];
  const places = ['paris', 'berlin', 'tokyo', 'seattle', 'london', 'cairo', 'austin', 'rome', 'dublin', 'moscow'];
  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'teal', 'maroon', 'navy'];
  const animals = ['panda', 'eagle', 'tiger', 'lion', 'bear', 'shark', 'wolf', 'dolphin', 'turtle', 'fox'];

  // 각 배열에서 랜덤한 단어 선택
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const place = places[Math.floor(Math.random() * places.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];

  // 선택된 단어들을 결합하여 세션 이름 생성
  return `${adjective}-${place}-${color}-${animal}`;
};

export default generateRandomName;