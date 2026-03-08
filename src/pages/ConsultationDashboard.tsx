import { useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { mockAppointments } from "@/data/consultationMockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Video,
  Download,
  Clock,
  MessageCircle,
  Star,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ConsultationDashboard = () => {
  const { toast } = useToast();
  const upcoming = mockAppointments.filter((a) => a.status === "upcoming");
  const past = mockAppointments.filter((a) => a.status === "completed");

  const handleRating = () => {
    toast({ title: "Thank you!", description: "Your review has been submitted." });
  };

  return (
    <PageLayout
      title="My Consultations"
      subtitle="Manage your appointments, join meetings, and download diet plans."
    >
      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Calendar, label: "Upcoming", value: upcoming.length, color: "text-primary" },
          { icon: Clock, label: "Completed", value: past.length, color: "text-accent" },
          { icon: FileText, label: "Diet Plans", value: past.filter((a) => a.dietPlan).length, color: "text-primary" },
          { icon: MessageCircle, label: "Messages", value: "3", color: "text-accent" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <s.icon className={cn("w-5 h-5 mx-auto mb-2", s.color)} />
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="glass-card rounded-full mb-6 p-1">
          <TabsTrigger value="upcoming" className="rounded-full text-xs px-5">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="rounded-full text-xs px-5">Completed</TabsTrigger>
          <TabsTrigger value="plans" className="rounded-full text-xs px-5">Diet Plans</TabsTrigger>
          <TabsTrigger value="messages" className="rounded-full text-xs px-5">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((apt) => (
                <div key={apt.id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start gap-4">
                    <img src={apt.nutritionistPhoto} alt={apt.nutritionist} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{apt.nutritionist}</h3>
                          <p className="text-xs text-muted-foreground">{apt.specialization}</p>
                        </div>
                        <Badge className="rounded-full text-[10px] bg-primary/15 text-primary border-0">
                          Upcoming
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        {apt.meetingLink && (
                          <a href={apt.meetingLink} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" className="rounded-full text-xs px-4">
                              <Video className="w-3.5 h-3.5 mr-1.5" /> Join Meeting
                            </Button>
                          </a>
                        )}
                        <Button variant="ghost" size="sm" className="rounded-full text-xs">
                          <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center">
              <Calendar className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">No upcoming consultations</p>
              <Link to="/consultation">
                <Button className="rounded-full">Find a Nutritionist</Button>
              </Link>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          <div className="space-y-4">
            {past.map((apt) => (
              <div key={apt.id} className="glass-card rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <img src={apt.nutritionistPhoto} alt={apt.nutritionist} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{apt.nutritionist}</h3>
                        <p className="text-xs text-muted-foreground">{apt.specialization}</p>
                      </div>
                      <Badge variant="secondary" className="rounded-full text-[10px]">
                        Completed
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {apt.dietPlan && (
                        <Button variant="glass" size="sm" className="rounded-full text-xs">
                          <Download className="w-3.5 h-3.5 mr-1.5" /> {apt.dietPlan.name}
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="rounded-full text-xs" onClick={handleRating}>
                        <Star className="w-3.5 h-3.5 mr-1.5" /> Rate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans">
          <div className="space-y-4">
            {past.filter((a) => a.dietPlan).map((apt) => (
              <div key={apt.id} className="glass-card rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{apt.dietPlan!.name}</h4>
                  <p className="text-xs text-muted-foreground">By {apt.nutritionist} • {apt.date}</p>
                </div>
                <Button variant="ghost" size="sm" className="rounded-full text-xs shrink-0">
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="glass-card rounded-2xl p-12 text-center">
            <MessageCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold text-foreground mb-1">Messaging Coming Soon</p>
            <p className="text-sm text-muted-foreground">Direct messaging with your nutritionists will be available soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default ConsultationDashboard;
