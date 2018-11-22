import React, { Component } from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Finished from '../../components/Finished/Finished'
import dq from '../../DataQuiz'

class Quiz extends Component {
  state = {
    answerState: null,
    showTitle: false,
    activeQuestion: 0,
    showBtnFruther: false,
    notRight: null,
    pointerEvent: '',
    isFinished: false,
    balls: [],
    whoAreYou: [
      {
        id:1,
        you: '1',
      },
      {
        id:2,
        you: '2',
      },
      {
        id:3,
        you: '3',
      },
      {
        id:4,
        you: '4',
      },
    ],
    titlePage: [
      {
        titleTest: '«Удалить аппендицит в домашних условиях искать»',
        textTest: 'Тест МТС и Саринформа о том, можно ли ставить диагноз и лечиться самостоятельно, приведет ли это к выздоровлению. <br/>Спорим, вы  пытались поставить себе диагноз или найти способ оказания первой медицинской помощи через интернет - поисковики?   Бывает, что недуг застает вечером или в дороге, медучреждения  уже закрыты, а весомых поводов вызывать скорую помощь нет.  И тогда мы обращаемся к интернету. В этом тесте, который Саринформ создал вместе с телемедицинским сервисом SmartMed ( https://www.smartmed.pro/?utm_campaign=meduza_razvit_0518)   , разработанным МТС и федеральной сетью клиник МЕДСИ, предлагаем безопасно проверить  качество  помощи из поисковиков. Правила такие: мы показываем предполагаемый  поисковый запрос, а вы  выбираете наиболее подходящий ответ из поисковой выдачи. Сразу предупредим, что абсолютно правильных ответов в тесте  нет: каждый случай индивидуален, и правильнее  проконсультироваться с  врачом в поликлинике или онлайн, а не искать   самостоятельно способ лечения в интернете.',
      }
    ],
    quiz: dq
  }

  titleShowHandle = () => {
    this.setState({
      showTitle: !this.state.showTitle
    })
  }

  nextQuestion = () => {
    if (this.isQuizFinished()){
      console.log('fifnished')
      const reducer = (acc, crntv) => acc + crntv
      const countBall = this.state.balls.reduce(reducer)
      console.log(countBall);
      this.setState({
        isFinished: true
      })
    } else {
      this.setState({
        activeQuestion: this.state.activeQuestion + 1,
        answerState: null,
        showBtnFruther: !this.state.showBtnFruther,
        notRight: null,
        pointerEvent: ''
      })
    }
  }

  onAnswerClickHandler = (answerId) => {

    const question = this.state.quiz[this.state.activeQuestion]
    const ball = this.state.balls.push(question.answers[answerId-1].id)
    console.log(this.state.balls)

    this.setState({
      showBtnFruther: true,
      notRight: question.answers[answerId-1].description,
      pointerEvent: 'none'
    })

    if (question.rightAnswerId === answerId){

      this.setState({
        answerState: {[answerId]: 'success'},
      })

    } else {
      this.setState({
        answerState: {[answerId]: 'error'}
      })
    }

  }

isQuizFinished(){
  return this.state.activeQuestion + 1 === this.state.quiz.length
}

  render() {
    return (
      <div className={classes.Quiz}>
          <div className={classes.QuizWrapper}>
            {
              this.state.isFinished
              ?
              <Finished

              />
              :
              <ActiveQuiz
                showTitle={this.state.showTitle}
                titleTest={this.state.titlePage[0].titleTest}
                textTest={this.state.titlePage[0].textTest}
                titleShowHandle={this.titleShowHandle}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                question={this.state.quiz[this.state.activeQuestion].question}
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                classBtnFruther={this.state.showBtnFruther}
                nextQuestion={this.nextQuestion}
                state={this.state.answerState}
                notRight={this.state.notRight}
                pointerEvent={this.state.pointerEvent}
                isQuizFinished={this.isQuizFinished()}
            />
          }
          </div>
      </div>
    )
  }
}

export default Quiz
