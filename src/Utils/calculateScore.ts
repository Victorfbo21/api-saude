import { IUserCalculateScore } from "Interfaces/calculateScore.interface"
const CalculateScore = (users: IUserCalculateScore[]): IUserCalculateScore[] => {

    const usersWithHighestScore = users.map(user => ({
        ...user,
        score: (1 / (3.72) ** (2.8 - user.sd)) * 100,
    }));

    usersWithHighestScore.sort((a, b) => b.score - a.score);

    const top10Users = usersWithHighestScore.slice(0, 10);

    return top10Users;
}

export default CalculateScore