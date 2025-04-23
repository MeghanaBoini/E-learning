import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Performance = () => {
  // Static data
  const subjectProgress = [
    { name: "Docker", progress: 75, color: "#4f46e5" },
    { name: "Data Science", progress: 68, color: "#4f46e5" },
    { name: "Machine Learning", progress: 82, color: "#4f46e5" },
    { name: "Full stack Development", progress: 59, color: "#4f46e5" },
  ];

  const skillProgress = [
    { name: "Programming", progress: 1, color: "#10b981" },
    { name: "Design", progress: 1, color: "#10b981" },
    { name: "Writing", progress: 1, color: "#10b981" },
    { name: "Public Speaking", progress: 1, color: "#10b981" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">My Performance</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Track your learning progress and achievements
        </p>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Courses Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Average Quiz Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">87%</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">Current Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">7 days</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Academic Subjects Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={subjectProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis domain={[0, 100]} stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progress" fill="#4f46e5" name="Progress %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Skills Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={skillProgress}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis domain={[0, 100]} stroke="#6b7280" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progress" fill="#10b981" name="Progress %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Academic Subjects</h2>
              {subjectProgress.map((subject) => (
                <div key={subject.name} className="space-y-2">
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>{subject.name}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skill Development</h2>
              {skillProgress.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-gray-900 dark:text-white">
                    <span>{skill.name}</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Performance;