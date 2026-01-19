import React, { useState } from "react";
import { SettingsProvider } from "./contexts/SettingsContext";
import { BottomNav } from "./components/BottomNav";
import { WelcomeScreen } from "./components/screens/WelcomeScreen";
import { WelcomeBackScreen } from "./components/screens/WelcomeBackScreen";
import { LoginScreen } from "./components/screens/LoginScreen";
import { SignupScreen } from "./components/screens/SignupScreen";
import { HomeScreen } from "./components/screens/HomeScreen";
import { MapScreen } from "./components/screens/MapScreen";
import { RegisterAnimalScreen } from "./components/screens/RegisterAnimalScreen";
import { PostDetailsScreen } from "./components/screens/PostDetailsScreen";
import { ShareScreen } from "./components/screens/ShareScreen";
import { NotificationsScreen } from "./components/screens/NotificationsScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { OwnerClaimScreen } from "./components/screens/OwnerClaimScreen";
import { CaregiversScreen } from "./components/screens/CaregiversScreen";
import { CaregiverSignupScreen } from "./components/screens/CaregiverSignupScreen";
import { CaregiverProfileScreen } from "./components/screens/CaregiverProfileScreen";
import { CreateReviewScreen } from "./components/screens/CreateReviewScreen";
import { ChatScreen } from "./components/screens/ChatScreen";
import { ServicesHubScreen } from "./components/screens/ServicesHubScreen";
import { VetsScreen } from "./components/screens/VetsScreen";
import { VetSignupScreen } from "./components/screens/VetSignupScreen";
import { ClinicSignupScreen } from "./components/screens/ClinicSignupScreen";
import { VetProfileScreen } from "./components/screens/VetProfileScreen";
import { CreateVetReviewScreen } from "./components/screens/CreateVetReviewScreen";
import { PartnersScreen } from "./components/screens/PartnersScreen";
import { PartnerSignupScreen } from "./components/screens/PartnerSignupScreen";
import { PartnerProfileScreen } from "./components/screens/PartnerProfileScreen";
import { CreatePartnerReviewScreen } from "./components/screens/CreatePartnerReviewScreen";
import { ManageProductsScreen } from "./components/screens/ManageProductsScreen";
import { PatinhasWalletScreen } from "./components/screens/PatinhasWalletScreen";
import { RedeemDiscountScreen } from "./components/screens/RedeemDiscountScreen";
import { MyPetsScreen } from "./components/screens/MyPetsScreen";
import { PetRegistrationScreen } from "./components/screens/PetRegistrationScreen";
import { ReportLostPetScreen } from "./components/screens/ReportLostPetScreen";
import { LostPetAlertScreen } from "./components/screens/LostPetAlertScreen";
import { CommunityScreen } from "./components/screens/CommunityScreen";
import { MentionsScreen } from "./components/screens/MentionsScreen";
import { DonationListScreen } from "./components/screens/DonationListScreen";
import { DonationDetailsScreen } from "./components/screens/DonationDetailsScreen";
import { CreateDonationScreen } from "./components/screens/CreateDonationScreen";
import { DonationPublishedScreen } from "./components/screens/DonationPublishedScreen";
import { MyDonationsScreen } from "./components/screens/MyDonationsScreen";
import { SettingsScreen } from "./components/screens/SettingsScreen";
import { PetDetailScreen } from "./components/screens/PetDetailScreen";
import { PetHealthCardScreen } from "./components/screens/PetHealthCardScreen";

type Screen =
  | "welcome"
  | "welcome-back"
  | "login"
  | "signup"
  | "home"
  | "map"
  | "register"
  | "post-details"
  | "share"
  | "notifications"
  | "profile"
  | "settings"
  | "owner-claim"
  | "services-hub"
  | "caregivers"
  | "caregiver-signup"
  | "caregiver-profile"
  | "create-review"
  | "chat"
  | "vets"
  | "vet-signup"
  | "clinic-signup"
  | "vet-profile"
  | "create-vet-review"
  | "partners"
  | "partner-signup"
  | "partner-profile"
  | "create-partner-review"
  | "manage-products"
  | "patinhas-wallet"
  | "redeem-discount"
  | "my-pets"
  | "pet-registration"
  | "report-lost-pet"
  | "lost-pet-alert"
  | "community"
  | "mentions"
  | "donation-list"
  | "donation-details"
  | "create-donation"
  | "pet-detail"
  | "pet-health-card";

interface NavigationData {
  post?: any;
  caregiver?: any;
  vet?: any;
  partner?: any;
  pet?: any;
  location?: any;
  donation?: any;
}

function App() {
  // Verificar dispositivo confiável no carregamento inicial
  const getInitialScreen = (): Screen => {
    const isTrustedDevice = localStorage.getItem('petmatch_trusted_device') === 'true';
    return isTrustedDevice ? 'welcome-back' : 'welcome';
  };

  const [currentScreen, setCurrentScreen] =
    useState<Screen>(getInitialScreen());
  const [navigationData, setNavigationData] =
    useState<NavigationData>({});
  const [screenHistory, setScreenHistory] = useState<Screen[]>(
    [],
  );

  const navigate = (screen: Screen, data?: any) => {
    setScreenHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screen);
    if (data) {
      setNavigationData(data);
    }
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen =
        screenHistory[screenHistory.length - 1];
      setScreenHistory((prev) => prev.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const showBottomNav = [
    "home",
    "map",
    "register",
    "notifications",
    "profile",
    "services-hub",
    "caregivers",
    "vets",
    "partners",
    "community",
  ].includes(currentScreen);

  // Render the appropriate screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onNavigate={navigate} />;

      case "welcome-back":
        return <WelcomeBackScreen onNavigate={navigate} />;

      case "login":
        return <LoginScreen onNavigate={navigate} />;

      case "signup":
        return <SignupScreen onNavigate={navigate} />;

      case "home":
        return <HomeScreen onNavigate={navigate} />;

      case "map":
        return <MapScreen onNavigate={navigate} />;

      case "register":
        return <RegisterAnimalScreen onNavigate={navigate} />;

      case "post-details":
        return navigationData.post ? (
          <PostDetailsScreen
            post={navigationData.post}
            onNavigate={navigate}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "share":
        return navigationData.post ? (
          <ShareScreen
            post={navigationData.post}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "notifications":
        return <NotificationsScreen onNavigate={navigate} />;

      case "profile":
        return <ProfileScreen onNavigate={navigate} />;

      case "settings":
        return (
          <SettingsScreen
            onNavigate={navigate}
            onBack={goBack}
          />
        );

      case "owner-claim":
        return navigationData.post ? (
          <OwnerClaimScreen
            post={navigationData.post}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "caregivers":
        return <CaregiversScreen onNavigate={navigate} />;

      case "caregiver-signup":
        return (
          <CaregiverSignupScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "caregiver-profile":
        return navigationData.caregiver ? (
          <CaregiverProfileScreen
            caregiver={navigationData.caregiver}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "create-review":
        return navigationData.caregiver ? (
          <CreateReviewScreen
            caregiver={navigationData.caregiver}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "chat":
        return navigationData.caregiver ? (
          <ChatScreen
            caregiver={navigationData.caregiver}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "services-hub":
        return <ServicesHubScreen onNavigate={navigate} />;

      case "vets":
        return <VetsScreen onNavigate={navigate} />;

      case "vet-signup":
        return (
          <VetSignupScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "clinic-signup":
        return (
          <ClinicSignupScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "vet-profile":
        return navigationData.vet ? (
          <VetProfileScreen
            vet={navigationData.vet}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "create-vet-review":
        return navigationData.vet ? (
          <CreateVetReviewScreen
            vet={navigationData.vet}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "partners":
        return <PartnersScreen onNavigate={navigate} />;

      case "partner-signup":
        return (
          <PartnerSignupScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "partner-profile":
        return navigationData.partner ? (
          <PartnerProfileScreen
            partner={navigationData.partner}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "create-partner-review":
        return navigationData.partner ? (
          <CreatePartnerReviewScreen
            partner={navigationData.partner}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "manage-products":
        return navigationData.partner ? (
          <ManageProductsScreen
            partner={navigationData.partner}
            onBack={goBack}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "patinhas-wallet":
        return (
          <PatinhasWalletScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "redeem-discount":
        return (
          <RedeemDiscountScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "my-pets":
        return (
          <MyPetsScreen onBack={goBack} onNavigate={navigate} />
        );

      case "pet-registration":
        return (
          <PetRegistrationScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "report-lost-pet":
        return (
          <ReportLostPetScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "lost-pet-alert":
        return (
          <LostPetAlertScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "community":
        return <CommunityScreen onNavigate={navigate} />;

      case "mentions":
        return (
          <MentionsScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "donation-list":
        return <DonationListScreen onNavigate={navigate} />;

      case "donation-details":
        return navigationData.donation ? (
          <DonationDetailsScreen
            donation={navigationData.donation}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "create-donation":
        return (
          <CreateDonationScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "donation-published":
        return (
          <DonationPublishedScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "my-donations":
        return (
          <MyDonationsScreen
            onBack={goBack}
            onNavigate={navigate}
          />
        );

      case "pet-detail":
        return navigationData.pet ? (
          <PetDetailScreen
            pet={navigationData.pet}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      case "pet-health-card":
        return navigationData.pet ? (
          <PetHealthCardScreen
            pet={navigationData.pet}
            onBack={goBack}
            onNavigate={navigate}
          />
        ) : (
          <HomeScreen onNavigate={navigate} />
        );

      default:
        return <HomeScreen onNavigate={navigate} />;
    }
  };

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-[var(--app-bg-light)]">
        <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
          {renderScreen()}

          {showBottomNav && (
            <BottomNav
              currentScreen={currentScreen}
              onNavigate={navigate}
            />
          )}
        </div>
      </div>
    </SettingsProvider>
  );
}

export default App;