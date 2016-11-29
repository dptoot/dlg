import store from './store';
import moment from 'moment';

class RemoteDataInterface {
  
    static movie(movie) {

    	const year = moment(movie.release_date).format("YYYY");

        return {
            id: movie.id,
            imagePath: movie.image,
            name: movie.value,
            year: year === 'Invalid date' ? 'n/a' : year,
        };
    }

    static user(user) {
        return {
            id: user.id,
            name: user.value,
        };
    }

    static actor(actor) {
        return {
            id: actor.id,
            imagePath: actor.image,
            name: actor.value,
        };
    }

    static getMatch(match, state) {
    	const matchData = {
			id: match._id,
			actor: match.actor,
			status: match.status,
			started: moment(match.createdAt).fromNow(),
			lastPlayed: moment(match.updatedAt).fromNow(),
			showSearch: false,
			...RemoteDataInterface.sortPlayers([match.player_1, match.player_2], state.user),
			...RemoteDataInterface.getAnswerData(match.answers, match.status),
		}

		if (matchData.userPlayer.status === 'current') {
			matchData.showSearch = true;
		}


		return matchData;
    }

    static sortPlayers(players, user) {
		const sortedPlayers = {};

		players.forEach(player => {

			// Normalize id attribute
			Object.assign(player, {
				user: {
					name: player.user.name,
					id: player.user._id,
				}
			})

			if (player.user.id !== user.id) {
				sortedPlayers.opponent = player;
			} else {
				sortedPlayers.userPlayer = player;
			}
		});

		return sortedPlayers;
	}

	static getAnswerData(answers = [], matchStatus) {
			const formattedAnswers = [];
			let lastAnswer = false;
			let selectedAnswerCount = 0;

			answers.forEach(answer => {
				const formattedAnswer = {
					id: answer._id,
					remoteId: answer.remote_id,
					year: moment(answer.release_date).format('YYYY'),
				}	

				if (answer.selected) {
					Object.assign(formattedAnswer, {
						selected: answer.selected,
						title: answer.title,
						imagePath: answer.poster_path,
						selectedBy: null,
						selectionIndex: answer.selectionIndex,
						overview: answer.overview,
					})

					if(!lastAnswer || answer.selectionIndex >= lastAnswer.selectionIndex) {
						lastAnswer = formattedAnswer;
					}

					selectedAnswerCount++;
				} else if (matchStatus === 'inactive') {
					Object.assign(formattedAnswer, {
						imagePath: answer.poster_path,
					})
				}



				formattedAnswers.push(formattedAnswer);
			})

			return {
				answers: formattedAnswers,
				lastAnswer: lastAnswer,
				totalAnswerCount: answers.length,
				selectedAnswerCount: selectedAnswerCount,
				answerCompletionPercentage: Math.floor((selectedAnswerCount/answers.length)*100)
			}
		}

  
}

export default RemoteDataInterface;