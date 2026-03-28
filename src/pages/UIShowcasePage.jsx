import React, { useState } from 'react';
import { FiStar, FiHeart, FiDownload, FiSend, FiPlus, FiSettings, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import AnimatedButton, { ButtonVariants, ButtonSizes, FloatingActionButton, ButtonGroup } from '../components/AnimatedButton.jsx';
import AnimatedNotification, { useNotifications, NotificationTypes } from '../components/AnimatedNotification.jsx';
import { CardSkeleton, StatCardSkeleton, ListItemSkeleton, CalendarSkeleton, DashboardSkeleton } from '../components/LoadingSkeleton.jsx';

export default function UIShowcasePage() {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const notifications = useNotifications();

  const handleNotificationDemo = (type) => {
    const messages = {
      [NotificationTypes.SUCCESS]: {
        title: 'Success!',
        message: 'Your action was completed successfully.',
      },
      [NotificationTypes.ERROR]: {
        title: 'Error!',
        message: 'Something went wrong. Please try again.',
      },
      [NotificationTypes.WARNING]: {
        title: 'Warning!',
        message: 'Please review your input before proceeding.',
      },
      [NotificationTypes.INFO]: {
        title: 'Information',
        message: 'Here is some useful information for you.',
      },
    };

    notifications[type](messages[type].title, messages[type].message);
  };

  if (showSkeleton) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Professional UI Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience modern, animated components with professional design and smooth interactions.
          </p>
        </div>

        {/* Animated Buttons Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <FiStar className="text-blue-600 text-2xl" />
            </div>
            Animated Buttons
          </h2>
          
          <div className="space-y-8">
            {/* Button Variants */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <AnimatedButton variant={ButtonVariants.PRIMARY} leftIcon={<FiStar />}>
                  Primary
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.SECONDARY} leftIcon={<FiHeart />}>
                  Secondary
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.SUCCESS} leftIcon={<FiDownload />}>
                  Success
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.DANGER} leftIcon={<FiSend />}>
                  Danger
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.WARNING}>
                  Warning
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.INFO}>
                  Info
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.GHOST}>
                  Ghost
                </AnimatedButton>
                <AnimatedButton variant={ButtonVariants.OUTLINE}>
                  Outline
                </AnimatedButton>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <AnimatedButton size={ButtonSizes.SMALL}>Small</AnimatedButton>
                <AnimatedButton size={ButtonSizes.MEDIUM}>Medium</AnimatedButton>
                <AnimatedButton size={ButtonSizes.LARGE}>Large</AnimatedButton>
                <AnimatedButton size={ButtonSizes.EXTRA_LARGE}>Extra Large</AnimatedButton>
              </div>
            </div>

            {/* Animation Types */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Animation Types</h3>
              <div className="flex flex-wrap gap-4">
                <AnimatedButton animationType="scale">Scale</AnimatedButton>
                <AnimatedButton animationType="bounce">Bounce</AnimatedButton>
                <AnimatedButton animationType="pulse">Pulse</AnimatedButton>
                <AnimatedButton animationType="shake">Shake</AnimatedButton>
                <AnimatedButton animationType="glow">Glow</AnimatedButton>
              </div>
            </div>

            {/* Button States */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Button States</h3>
              <div className="flex flex-wrap gap-4">
                <AnimatedButton>Normal</AnimatedButton>
                <AnimatedButton loading>Loading</AnimatedButton>
                <AnimatedButton disabled>Disabled</AnimatedButton>
              </div>
            </div>

            {/* Button Group */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Button Groups</h3>
              <div className="space-y-4">
                <ButtonGroup>
                  <AnimatedButton variant={ButtonVariants.OUTLINE}>First</AnimatedButton>
                  <AnimatedButton variant={ButtonVariants.OUTLINE}>Second</AnimatedButton>
                  <AnimatedButton variant={ButtonVariants.OUTLINE}>Third</AnimatedButton>
                </ButtonGroup>
                
                <ButtonGroup orientation="vertical">
                  <AnimatedButton variant={ButtonVariants.PRIMARY}>Top</AnimatedButton>
                  <AnimatedButton variant={ButtonVariants.PRIMARY}>Middle</AnimatedButton>
                  <AnimatedButton variant={ButtonVariants.PRIMARY}>Bottom</AnimatedButton>
                </ButtonGroup>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-xl">
              <FiMail className="text-green-600 text-2xl" />
            </div>
            Animated Notifications
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <AnimatedButton 
              variant={ButtonVariants.SUCCESS}
              onClick={() => handleNotificationDemo(NotificationTypes.SUCCESS)}
            >
              Show Success
            </AnimatedButton>
            <AnimatedButton 
              variant={ButtonVariants.DANGER}
              onClick={() => handleNotificationDemo(NotificationTypes.ERROR)}
            >
              Show Error
            </AnimatedButton>
            <AnimatedButton 
              variant={ButtonVariants.WARNING}
              onClick={() => handleNotificationDemo(NotificationTypes.WARNING)}
            >
              Show Warning
            </AnimatedButton>
            <AnimatedButton 
              variant={ButtonVariants.INFO}
              onClick={() => handleNotificationDemo(NotificationTypes.INFO)}
            >
              Show Info
            </AnimatedButton>
          </div>
        </section>

        {/* Loading Skeletons Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <FiSettings className="text-purple-600 text-2xl" />
            </div>
            Loading Skeletons
          </h2>
          
          <div className="space-y-6">
            <div className="flex gap-4 mb-6">
              <AnimatedButton 
                variant={showSkeleton ? ButtonVariants.DANGER : ButtonVariants.PRIMARY}
                onClick={() => setShowSkeleton(!showSkeleton)}
              >
                {showSkeleton ? 'Hide' : 'Show'} Full Dashboard Skeleton
              </AnimatedButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CardSkeleton />
              <div className="space-y-4">
                <ListItemSkeleton />
                <ListItemSkeleton />
                <ListItemSkeleton />
              </div>
              <CalendarSkeleton />
            </div>
          </div>
        </section>

        {/* Professional Cards Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-xl">
              <FiUser className="text-pink-600 text-2xl" />
            </div>
            Professional Cards
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Glassmorphism Card */}
            <div className="glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">John Doe</h3>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Passionate about creating beautiful and functional user interfaces with modern technologies.
              </p>
              <div className="flex gap-2 mt-4">
                <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  <FiMail className="w-3 h-3" />
                  john@example.com
                </div>
              </div>
            </div>

            {/* Gradient Border Card */}
            <div className="gradient-border p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold">
                  SA
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Sarah Adams</h3>
                  <p className="text-sm text-gray-600">UI/UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Creating intuitive and delightful user experiences through thoughtful design and research.
              </p>
              <div className="flex gap-2 mt-4">
                <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  <FiPhone className="w-3 h-3" />
                  +1 (555) 123-4567
                </div>
              </div>
            </div>

            {/* Animated Hover Card */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold">
                    MJ
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Mike Johnson</h3>
                    <p className="text-sm text-gray-600">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Leading cross-functional teams to deliver exceptional products that users love.
                </p>
                <div className="flex gap-2 mt-4">
                  <div className="flex items-center gap-1 text-xs text-gray-600 bg-white/70 px-2 py-1 rounded-full">
                    <FiUser className="w-3 h-3" />
                    Team Lead
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <FiPlus className="w-6 h-6" />
      </FloatingActionButton>

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
        {notifications.notifications.map((notification) => (
          <AnimatedNotification
            key={notification.id}
            {...notification}
            onClose={() => notifications.removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}