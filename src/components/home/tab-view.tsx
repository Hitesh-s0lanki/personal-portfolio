import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabView = () => {
  return (
    <Tabs
      defaultValue="account"
      className="w-full bg-[linear-gradient(180deg,#2F3D59,#0B1326)] text-white p-5 rounded-3xl"
    >
      <TabsList className="grid w-full grid-cols-3 bg-transparent">
        <TabsTrigger value="account">Skills</TabsTrigger>
        <TabsTrigger value="password">Experience</TabsTrigger>
        <TabsTrigger value="education">Education</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <h1 className=" text-white">Hello</h1>
      </TabsContent>
      <TabsContent value="password"></TabsContent>
    </Tabs>
  );
};

export default TabView;
