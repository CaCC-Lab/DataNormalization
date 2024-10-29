'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Quiz({ questions }: { questions: any[] }) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(questions.length).fill(null))
  const [showResults, setShowResults] = useState<boolean>(false)

  const handleAnswer = (answer: string | null) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestion] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1))
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setShowResults(false)
  }

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">クイズ結果</h3>
        <p>
          {questions.length}問中{score}問正解です。
          {score === questions.length
            ? '素晴らしい！完璧です！'
            : score >= questions.length * 0.8
            ? 'よくできました！もう少しで完璧です。'
            : score >= questions.length * 0.6
            ? '良い成績です。復習してさらに理解を深めましょう。'
            : '基本的な概念をもう一度復習しましょう。'}
        </p>
        {questions.map((q, index) => (
          <div key={index} className="mt-4 p-4 border rounded-md">
            <p className="font-semibold">問題 {index + 1}: {q.question}</p>
            <p className="mt-2">あなたの回答: {selectedAnswers[index]}</p>
            <p className={`mt-1 ${selectedAnswers[index] === q.correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
              正解: {q.correctAnswer}
            </p>
            <p className="mt-2 text-gray-700">{q.explanation}</p>
          </div>
        ))}
        <Button onClick={handleRetry}>もう一度挑戦する</Button>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="space-y-4">
      <p className="font-semibold">
        問題 {currentQuestion + 1} / {questions.length}: {question.question}
      </p>
      {question.answers.map((answer: string, index: number) => (
        <Button
          key={index}
          onClick={() => handleAnswer(answer)}
          className={`w-full justify-start ${
            selectedAnswers[currentQuestion] === answer ? 'bg-blue-500 hover:bg-blue-600' : ''
          }`}
        >
          {answer}
        </Button>
      ))}
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
          前の問題
        </Button>
        <Button onClick={handleNext} disabled={selectedAnswers[currentQuestion] === null}>
          {currentQuestion === questions.length - 1 ? '結果を見る' : '次の問題'}
        </Button>
      </div>
    </div>
  )
}

export function DataNormalization() {
  const [currentStep, setCurrentStep] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const steps = [
    {
      title: "データの正規化とは？",
      content: (
        <div className="space-y-4">
          <p>データの正規化は、データベースの設計を改善し、データの重複を減らし、一貫性を保ち、データの整合性を高めるために用いられる技術です。</p>
          <h3 className="text-lg font-semibold">なぜ正規化が重要なのか？</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold text-blue-600">冗長性の削減：</span>同じデータが複数回入力されることを防ぎます。</li>
            <li><span className="font-semibold text-green-600">整合性の向上：</span>データの更新や削除時に、矛盾が発生する可能性を減らします。</li>
            <li><span className="font-semibold text-purple-600">効率性の向上：</span>データの検索や処理を効率化します。</li>
          </ul>
        </div>
      )
    },
    {
      title: "第1正規形",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-lg">1つのセルには1つの情報だけを入れる</p>
          <Tabs defaultValue="before">
            <TabsList>
              <TabsTrigger value="before">正規化前</TabsTrigger>
              <TabsTrigger value="after">正規化後</TabsTrigger>
            </TabsList>
            <TabsContent value="before">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">従業員ID</th>
                    <th className="border border-gray-300 p-2">名前</th>
                    <th className="border border-gray-300 p-2">出発と到着地</th>
                    <th className="border border-gray-300 p-2">日付</th>
                    <th className="border border-gray-300 p-2">費用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">101</td>
                    <td className="border border-gray-300 p-2">田中太郎</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">東京→大阪</td>
                    <td className="border border-gray-300 p-2">2024/01/05</td>
                    <td className="border border-gray-300 p-2">5,000円</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">102</td>
                    <td className="border border-gray-300 p-2">佐藤花子</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">名古屋→福岡</td>
                    <td className="border border-gray-300 p-2">2024/02/10</td>
                    <td className="border border-gray-300 p-2">12,000円</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="after">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">従業員ID</th>
                    <th className="border border-gray-300 p-2">名前</th>
                    <th className="border border-gray-300 p-2">出発地</th>
                    <th className="border border-gray-300 p-2">到着地</th>
                    <th className="border border-gray-300 p-2">日付</th>
                    <th className="border border-gray-300 p-2">費用</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">101</td>
                    <td className="border border-gray-300 p-2">田中太郎</td>
                    <td className="border border-gray-300 p-2 bg-green-100">東京</td>
                    <td className="border border-gray-300 p-2 bg-green-100">大阪</td>
                    <td className="border border-gray-300 p-2">2024/01/05</td>
                    <td className="border border-gray-300 p-2">5,000円</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">102</td>
                    <td className="border border-gray-300 p-2">佐藤花子</td>
                    <td className="border border-gray-300 p-2 bg-green-100">名古屋</td>
                    <td className="border border-gray-300 p-2 bg-green-100">福岡</td>
                    <td className="border border-gray-300 p-2">2024/02/10</td>
                    <td className="border border-gray-300 p-2">12,000円</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </Tabs>
          <p>第1正規形では、各セルに1つの値だけが含まれるようにデータを分割します。これにより、データの検索や更新が容易になります。</p>
        </div>
      )
    },
    {
      title: "第2正規形",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-lg">部分的に依存しているデータを取り除き、情報を別のテーブルに分割する</p>
          <Tabs defaultValue="before">
            <TabsList>
              <TabsTrigger value="before">正規化前</TabsTrigger>
              <TabsTrigger value="after">正規化後</TabsTrigger>
            </TabsList>
            <TabsContent value="before">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">出張ID</th>
                    <th className="border border-gray-300 p-2">従業員ID</th>
                    <th className="border border-gray-300 p-2">従業員名</th>
                    <th className="border border-gray-300 p-2">部署</th>
                    <th className="border border-gray-300 p-2">出発地</th>
                    <th className="border border-gray-300 p-2">到着地</th>
                    <th className="border border-gray-300 p-2">出発日</th>
                    <th className="border border-gray-300 p-2">宿泊費</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">001</td>
                    <td className="border border-gray-300 p-2">101</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">田中太郎</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">営業部</td>
                    <td className="border border-gray-300 p-2">東京</td>
                    <td className="border border-gray-300 p-2">大阪</td>
                    <td className="border border-gray-300 p-2">2024/01/05</td>
                    <td className="border border-gray-300 p-2">8000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">002</td>
                    <td className="border border-gray-300 p-2">102</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">佐藤花子</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">総務部</td>
                    <td className="border border-gray-300 p-2">名古屋</td>
                    <td className="border border-gray-300 p-2">福岡</td>
                    <td className="border border-gray-300 p-2">2024/02/10</td>
                    <td className="border border-gray-300 p-2">12000</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="after">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">従業員テーブル</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">従業員ID</th>
                        <th className="border border-gray-300 p-2">従業員名</th>
                        <th className="border border-gray-300 p-2">部署</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">101</td>
                        <td className="border border-gray-300 p-2 bg-green-100">田中太郎</td>
                        <td className="border border-gray-300 p-2 bg-green-100">営業部</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300  p-2">102</td>
                        <td className="border border-gray-300 p-2 bg-green-100">佐藤花子</td>
                        <td className="border border-gray-300 p-2 bg-green-100">総務部</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-semibold">出張テーブル</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">出張ID</th>
                        <th className="border border-gray-300 p-2">従業員ID</th>
                        <th className="border border-gray-300 p-2">出発地</th>
                        <th className="border border-gray-300 p-2">到着地</th>
                        <th className="border border-gray-300 p-2">出発日</th>
                        <th className="border border-gray-300 p-2">宿泊費</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">001</td>
                        <td className="border border-gray-300 p-2">101</td>
                        <td className="border border-gray-300 p-2">東京</td>
                        <td className="border border-gray-300 p-2">大阪</td>
                        <td className="border border-gray-300 p-2">2024/01/05</td>
                        <td className="border border-gray-300 p-2">8000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">002</td>
                        <td className="border border-gray-300 p-2">102</td>
                        <td className="border border-gray-300 p-2">名古屋</td>
                        <td className="border border-gray-300 p-2">福岡</td>
                        <td className="border border-gray-300 p-2">2024/02/10</td>
                        <td className="border border-gray-300 p-2">12000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <p>第2正規形では、部分的な依存関係を持つデータを別のテーブルに分割します。これにより、データの重複を減らし、更新時の矛盾を防ぎます。</p>
        </div>
      )
    },
    {
      title: "第3正規形",
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-lg">各列が独立したデータを持つようにする</p>
          <Tabs defaultValue="before">
            <TabsList>
              <TabsTrigger value="before">正規化前</TabsTrigger>
              <TabsTrigger value="after">正規化後</TabsTrigger>
            </TabsList>
            <TabsContent value="before">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th  className="border border-gray-300 p-2">従業員ID</th>
                    <th className="border border-gray-300 p-2">従業員名</th>
                    <th className="border border-gray-300 p-2">部署ID</th>
                    <th className="border border-gray-300 p-2">部署名</th>
                    <th className="border border-gray-300 p-2">部署所在地</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">101</td>
                    <td className="border border-gray-300 p-2">田中太郎</td>
                    <td className="border border-gray-300 p-2">D01</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">営業部</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">東京</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">102</td>
                    <td className="border border-gray-300 p-2">佐藤花子</td>
                    <td className="border border-gray-300 p-2">D02</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">総務部</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">大阪</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">103</td>
                    <td className="border border-gray-300 p-2">鈴木一郎</td>
                    <td className="border border-gray-300 p-2">D01</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">営業部</td>
                    <td className="border border-gray-300 p-2 bg-yellow-100">東京</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
            <TabsContent value="after">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">従業員テーブル</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">従業員ID</th>
                        <th className="border border-gray-300 p-2">従業員名</th>
                        <th className="border border-gray-300 p-2">部署ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">101</td>
                        <td className="border border-gray-300 p-2">田中太郎</td>
                        <td className="border border-gray-300 p-2">D01</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">102</td>
                        <td className="border border-gray-300 p-2">佐藤花子</td>
                        <td className="border border-gray-300 p-2">D02</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">103</td>
                        <td className="border border-gray-300 p-2">鈴木一郎</td>
                        <td className="border border-gray-300 p-2">D01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="font-semibold">部署テーブル</h4>
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">部署ID</th>
                        <th className="border border-gray-300 p-2">部署名</th>
                        <th className="border border-gray-300 p-2">部署所在地</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-2">D01</td>
                        <td className="border border-gray-300 p-2 bg-green-100">営業部</td>
                        <td className="border border-gray-300 p-2 bg-green-100">東京</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-2">D02</td>
                        <td className="border border-gray-300 p-2 bg-green-100">総務部</td>
                        <td className="border border-gray-300 p-2 bg-green-100">大阪</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <p>第3正規形では、非キー列同士の依存関係を取り除きます。これにより、データの一貫性が向上し、更新時の異常を防ぎます。</p>
        </div>
      )
    },
    {
      title: "まとめ",
      content: (
        <div className="space-y-4">
          <p>データの正規化は、以下の3つのステップで行います：</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li><span className="font-semibold text-blue-600">第1正規形：</span>1つのセルには1つの情報だけを入れる</li>
            <li><span className="font-semibold text-green-600">第2正規形：</span>部分的に依存しているデータを取り除き、情報を別のテーブルに分割する</li>
            <li><span className="font-semibold text-purple-600">第3正規形：</span>各列が独立したデータを持つようにする</li>
          </ol>
          <p>これらのステップを踏むことで、データの重複を減らし、一貫性を保ち、データの整合性を高めることができます。</p>
          <Button onClick={() => setShowQuiz(true)} className="mt-4">
            理解度チェック
          </Button>
        </div>
      )
    }
  ]

  const slides = [
  {
    title: "タイトル",
    content: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">「データ整理の旅」 〜旅費精算のエクセル王国を救え！〜</h2>
      </div>
    )
  },
  {
    title: "登場人物",
    content: (
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold">カイ</h3>
          <p>総務課で働く新米社員。整理整頓は苦手だが、使命感があり、成長の可能性を秘めた青年。</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold">リク</h3>
          <p>カイの先輩で、Excelの達人。落ち着いた性格で、カイを支えながら導くメンター。人々が整理整頓を通じて成長することを信じている。</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-bold">エリシア王</h3>
          <p>エクセル王国の王様。王国を守るため、カイとリクに全てを託す。</p>
        </div>
      </div>
    )
  },
  {
    title: "プロローグ",
    content: (
      <div className="space-y-4">
        <img src="/images/Prologue.png?height=200&width=400" alt="エクセル王国の風景" className="mx-auto rounded-lg shadow-md" />
        <p>エクセル王国はかつて、すべてが整った美しい国だった。だが、時が経つにつれて、データの混乱が王国全体に広がっていった。特に「旅費精算書」は複雑さを増し、誰もがその整理に手を焼いていた。</p>
        <p>エリシア王はついに、一人の若者に助けを求める決意をした。「頼む、カイ。この王国を救ってほしい。」そう告げられた総務課の新米社員カイは、使命を胸に王国の未来を守ることを決意した。</p>
      </div>
    )
  },
  {
    title: "チャプター1: 「第一の試練 〜繰り返しの迷宮〜」",
    content: (
      <div className="space-y-4">
        <img src="/images/Chapter1.png" alt="繰り返しの迷宮" className="mx-auto rounded-lg shadow-md" />
        <p>カイとリクが最初に辿り着いたのは、「繰り返しの迷宮」だった。迷宮の壁には、無数に刻まれた「東京, 東京, 東京…」や「3000円, 3000円, 3000円…」といった文字が何度も繰り返されている。</p>
        <div className="bg-blue-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"なんで、同じ情報がこんなにたくさん書かれているんだろう…？"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"カイ、迷宮が混乱しているのは、一つの場所にたくさんの情報を詰め込みすぎているからさ。一度、情報を一つずつ整理してみよう。"</p>
        </div>
        <p>カイはリクの言葉に従い、表の情報を一つ一つ取り出して整理し始めた。すると、迷宮の壁が徐々に透けていき、道が現れた。</p>
        <div className="bg-green-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"すごい…！これで進める！"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"情報を一つずつ分けて整理するだけで、こんなにも道が見えてくるんだよ"</p>
        </div>
      </div>
    )
  },
  {
    title: "チャプター2: 「第二の試練 〜重複の洞窟〜」",
    content: (
      <div className="space-y-4">
        <img src="/images/Chapter2.png?height=200&width=400" alt="重複の洞窟" className="mx-auto rounded-lg shadow-md" />
        <p>次に二人が訪れたのは、「重複の洞窟」。洞窟内には、同じ社員の名前や部署が繰り返し書かれ、どれが最新の情報かがわからなくなっていた。</p>
        <div className="bg-yellow-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"これじゃ、何が正しいのかわからないよ…"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"カイ、同じ情報がいろんな場所にあると、混乱が起きるんだ。だから、共通の情報は一箇所にまとめておくんだよ。"</p>
        </div>
        <p>カイは社員ごとの情報を一つのリストにまとめ、重複した情報を分けて整理した。すると、洞窟の壁に書かれた文字が一つずつ消え、明るい光が差し込んできた。</p>
        <div className="bg-green-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"これで…整理できたかも！"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"一つにまとめることで、迷わずに進めるんだ。次は、もっと難しい場所が待っているよ"</p>
        </div>
      </div>
    )
  },
  {
    title: "チャプター3: 「第三の試練 〜依存の森〜」",
    content: (
      <div className="space-y-4">
        <img src="/images/Chapter3.png?height=200&width=400" alt="依存の森" className="mx-auto rounded-lg shadow-md" />
        <p>最後に二人が足を踏み入れたのは、「依存の森」。森の中では、情報があちこちに分散し、どの情報が正しいのかがわからなくなっていた。特に、部署ごとの責任者情報が入り乱れ、迷路のような状態になっていた。</p>
        <div className="bg-purple-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"どこに何があるのか全然わからない…"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"カイ、この森は情報があちこちに散らばっているから迷いやすいんだ。それぞれの情報を、関連付けしながら整理し直してみよう。"</p>
        </div>
        <p>カイはリクの言葉に従い、責任者の情報を一つのリストにまとめ、それぞれの部署とリンクさせた。すると、森の木々がまっすぐに整列し、明るい光が差し込んできた。</p>
        <div className="bg-green-100 p-4 rounded-md">
          <p className="font-semibold">カイ:</p>
          <p>"これで…道が見えた…！"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"ほら、整理整頓することで道が開けるんだよ"</p>
        </div>
      </div>
    )
  },
  {
    title: "エピローグ: 「エクセル王国の復興」",
    content: (
      <div className="space-y-4">
        <img src="/images/Epilogue.png?height=200&width=400" alt="復興したエクセル王国" className="mx-auto rounded-lg shadow-md" />
        <p>3つの試練を乗り越えたカイは、エリシア王に報告をするために城へ戻った。エリシア王は涙を流しながら感謝の言葉を述べた。</p>
        <div className="bg-pink-100 p-4 rounded-md">
          <p className="font-semibold">エリシア王:</p>
          <p>"カイ、ありがとう。この国はあなたのおかげで救われた。"</p>
          <p className="font-semibold mt-2">リク:</p>
          <p>"これからは君が、他の人たちを導いていくんだ。自分が学んだことを、他の人にも教えてあげよう。"</p>
        </div>
        <p>カイは深く頷いた。その顔には以前の迷いがなく、未来への希望が見えた。</p>
      </div>
    )
  }
];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>データ整理の旅 〜旅費精算のエクセル王国を救え！〜</CardTitle>
        <CardDescription>
          カイとリクと共に、データ正規化の冒険に出かけよう
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showStory ? (
          <div className="space-y-6">
            <div className="relative bg-gray-100 p-6 rounded-lg min-h-[400px]">
              <h2 className="text-2xl font-bold mb-4">{slides[currentSlide].title}</h2>
              {slides[currentSlide].content}
                        </div>
            <div className="flex justify-between items-center">
              <Button onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> 前へ
              </Button>
              <span>{currentSlide + 1} / {slides.length}</span>
              <Button onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)} variant="outline">
                次へ <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <Button onClick={() => setShowStory(false)} className="w-full">
              学習コンテンツに戻る
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {steps[currentStep].content}
            <div className="flex justify-between mt-4">
              <Button
                                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
              >
                前へ
              </Button>
              <Button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
              >
                次へ
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button onClick={() => setShowStory(true)} className="flex-1">
                データ整理の旅を始める
              </Button>
            </div>
          </div>
        )}
        {showQuiz && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">理解度チェック</h3>
            <Quiz
              questions={[
                {
                  question: "データの正規化の主な目的は何ですか？",
                  answers: [
                    "データの見た目を良くする",
                    "データの重複を減らし、一貫性を保つ",
                    "データ量を増やす",
                    "データの計算速度を上げる"
                  ],
                  correctAnswer: "データの重複を減らし、一貫性を保つ",
                  explanation: "データの正規化の主な目的は、データの重複を減らし、一貫性を保つことです。これにより、データの整合性が向上し、更新時の矛盾を防ぐことができます。また、データの効率的な管理と検索が可能になります。"
                },
                {
                  question: "第1正規形の主な特徴は何ですか？",
                  answers: [
                    "1つのセルに複数の情報を入れる",
                    "1つのセルには1つの情報だけを入れる",
                    "すべてのデータを1つのテーブルにまとめる",
                    "データを常にアルファベット順に並べる"
                  ],
                  correctAnswer: "1つのセルには1つの情報だけを入れる",
                  explanation: "第1正規形の主な特徴は、1つのセルには1つの情報だけを入れることです。これにより、データの検索や更新が容易になり、データの一貫性が向上します。例えば、住所情報を「都道府県」「市区町村」「番地」に分けて保存することで、より柔軟なデータ操作が可能になります。"
                },
                {
                  question: "総務部で社員の勤怠管理をする場合、第2正規形を適用するとどのようになりますか？",
                  answers: [
                    "すべての情報を1つの大きなテーブルに入れる",
                    "社員情報と勤怠情報を別々のテーブルに分ける",
                    "各社員ごとに別々のテーブルを作成する",
                    "勤怠情報を日付ごとに別々のテーブルに分ける"
                  ],
                  correctAnswer: "社員情報と勤怠情報を別々のテーブルに分ける",
                  explanation: "第2正規形を適用する場合、社員情報（社員ID、氏名、部署など）と勤怠情報（出勤日、勤務時間など）を別々のテーブルに分けます。これにより、社員情報の更新と勤怠情報の記録を独立して行うことができ、データの重複を減らすことができます。社員IDを使って両テーブルを関連付けることで、必要な情報を柔軟に取得できます。"
                },
                {
                  question: "第3正規形を適用すると、どのような利点がありますか？",
                  answers: [
                    "データ入力が簡単になる",
                    "データの検索速度が上がる",
                    "非キー列同士の依存関係がなくなり、データの一貫性が向上する",
                    "テーブルの数が減少する"
                  ],
                  correctAnswer: "非キー列同士の依存関係がなくなり、データの一貫性が向上する",
                  explanation: "第3正規形を適用すると、非キー列同士の依存関係がなくなり、データの一貫性が向上します。これにより、データの更新や削除時に矛盾が生じるリスクが減少し、データベース全体の整合性が保たれやすくなります。例えば、部署情報を別テーブルに分けることで、部署名や所在地の変更を一箇所で行うだけで済むようになります。"
                },
                {
                  question: "総務部で社員の給与計算をする際、どのようにデータを正規化すると効率的ですか？",
                  answers: [
                    "すべての給与情報を1つの大きなテーブルに入れる",
                    "社員ごとに別々のテーブルを作成する",
                    "基本給と手当を別々のテーブルに分け、社員IDで関連付ける",
                    "毎月の給与計算結果を1つのセルにまとめて保存する"
                  ],
                  correctAnswer: "基本給と手当を別々のテーブルに分け、社員IDで関連付ける",
                  explanation: "給与計算を効率的に行うには、基本給と手当を別々のテーブルに分け、社員IDで関連付けるのが効果的です。これにより、基本給の変更や手当の追加・削除を柔軟に行うことができます。また、給与計算の際には必要な情報を各テーブルから取得して計算を行うことで、データの一貫性を保ちながら効率的な処理が可能になります。"
                }
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}