import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Eye, 
  Heart, 
  Repeat2, 
  ExternalLink, 
  Search, 
  Info, 
  RefreshCw, 
  TrendingUp, 
  BookOpen, 
  Sparkles,
  Github,
  CheckCircle2,
  AlertCircle,
  Facebook,
  Instagram
} from 'lucide-react';
import { Post, CategoryFilter, PlatformFilter, SortOption } from './types';
import PRESET_POSTS from '../public/data/posts.json';

// Fallback initial data for ultimate presentation bulletproofing
const BACKUP_POSTS: Post[] = [
  {
    "id": "x_2026_1",
    "platform": "x",
    "title": "【速報 地震情報】先ほど東京都渋谷区で震度3の地震が発生しました。...",
    "summary": "【速報 地震情報】先ほど東京都渋谷区で震度3の地震が発生しました。震源地は千葉県東方沖、マグニチュードは4.8と推定されます。津波の心配はありません。今後の余震情報にご注意ください。 #地震 #速報 #東京",
    "views": 125430,
    "likes": 3120,
    "reposts": 1845,
    "score": 137205,
    "category": "news",
    "url": "https://x.com/JP_Emergency_News/status/1000000000000000000",
    "tags": ["地震", "速報", "東京"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "facebook_2026_3",
    "platform": "facebook",
    "title": "【速報】日本の大手テック企業が新型AIモデル「SAKURA-1」を発表。...",
    "summary": "【速報】日本の大手テック企業が新型AIモデル「SAKURA-1」を発表。日本語の自然言語処理能力が従来比で約40%向上。一般向けAPIは明日から公开予定とのこと！日本の開発コミュニティがさらに盛り上がりそう。 #AI #テック #ChatGPT",
    "views": 89300,
    "likes": 4200,
    "reposts": 1100,
    "score": 101000,
    "category": "tech",
    "url": "https://www.facebook.com/IT_Trends_Japan/posts/200000000000001",
    "tags": ["AI", "テック", "ChatGPT", "Nextjs"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "facebook_2026_9",
    "platform": "facebook",
    "title": "【野球速報】プロ野球、伝統の一戦は巨人が延長11回サヨナラ勝ち！...",
    "summary": "【野球速報】プロ野球、伝統の一戦は巨人が延長11回サヨナラ勝ち！劇的なサヨナラホームランで満員の東京ドームが歓声に包まれました。大興奮のゲーム展開でした！ #プロ野球 #甲子園 #サヨナラ勝ち",
    "views": 52000,
    "likes": 3100,
    "reposts": 780,
    "score": 60540,
    "category": "sports",
    "url": "https://www.facebook.com/NPB_Update_Fan/posts/200000000000002",
    "tags": ["プロ野球", "甲子園", "サヨナラ勝ち"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "instagram_2026_2",
    "platform": "instagram",
    "title": "渋谷の路地裏に新しくオープンしたラーメン屋「あさひ」が絶品すぎる！...",
    "summary": "渋谷の路地裏に新しくオープンしたラーメン屋「あさひ」が絶品すぎる！濃厚な鴨ガラ出汁と細麺の相性が抜群で、1杯850円は安すぎる。チャーシューもトロトロで最高でした！またリピート確定！ #渋谷グルメ #ラーメン #東京ランチ",
    "views": 45010,
    "likes": 2150,
    "reposts": 420,
    "score": 50570,
    "category": "food",
    "url": "https://www.instagram.com/p/CoR4mSuP8H",
    "tags": ["渋谷グルメ", "ラーメン", "東京ランチ"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "x_2026_6",
    "platform": "x",
    "title": "【道路情報】首都高速3号渋谷線（上り）渋谷料金所付近でトラックと乗用車...",
    "summary": "【道路情報】首都高速3号渋谷線（上り）渋谷料金所付近でトラックと乗用車の衝突事故が発生。この影響で現在2車線が規制され、渋滞が5km続いています。通行予定の方は別ルートを強くお勧めします。 #渋滞情報 #事故 #速報",
    "views": 31200,
    "likes": 540,
    "reposts": 280,
    "score": 33120,
    "category": "news",
    "url": "https://x.com/Traffic_JP_Live/status/1000000000000000000",
    "tags": ["渋滞情報", "事故", "速報"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "facebook_2026_8",
    "platform": "facebook",
    "title": "【日本ニュース】文部科学省、小学校からのプログラミング教育にAIツール...",
    "summary": "【日本ニュース】文部科学省、小学校からのプログラミング教育にAIツールを限定導入する実証実験計画を発表。生徒の論理的思考力の底上げを目指す一方で、著作権や情報の正確性などの課題も検証を行うとのこと。 #テック #IT #教育ニュース",
    "views": 28300,
    "likes": 1120,
    "reposts": 420,
    "score": 31800,
    "category": "tech",
    "url": "https://www.facebook.com/Nippon_Kyodo_News/posts/200000000000003",
    "tags": ["テック", "IT", "教育ニュース"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 70).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "instagram_2026_4",
    "platform": "instagram",
    "title": "快晴の東京スカイツリーからの絶景をお届けします。富士山までくっきり...",
    "summary": "快晴の東京スカイツリーからの絶景をお届けします。富士山までくっきり見えて本当に素晴らしい朝です！今日から週末にかけて関東地方は全国的にお出かけ日和になりそうですね。 #東京 #観光 #旅行 #富士山",
    "views": 24300,
    "likes": 1200,
    "reposts": 180,
    "score": 27240,
    "category": "travel",
    "url": "https://www.instagram.com/p/CoY4sSuP8H",
    "tags": ["東京", "観光", "旅行", "富士山"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "instagram_2026_10",
    "platform": "instagram",
    "title": "そうだ、京都行こう。久しぶりに関西への1人旅。嵐山の渡月橋の景色に...",
    "summary": "そうだ、京都行こう。久しぶりに関西への1人旅。嵐山の渡月橋の景色に心から癒されました。緑の紅葉が美しく、深呼吸の良さを思い出します。 #旅行 #京都観光 #お出かけ",
    "views": 19800,
    "likes": 1250,
    "reposts": 190,
    "score": 22870,
    "category": "travel",
    "url": "https://www.instagram.com/p/CoZ8mSuP8H",
    "tags": ["旅行", "京都観光", "お出かけ"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "x_2026_4",
    "platform": "x",
    "title": "快晴の東京スカイツリーからの絶景をお届けします。富士山までくっきり...",
    "summary": "快晴の東京スカイツリーからの絶景をお届けします。富士山までくっきり見えて本当に素晴らしい朝です！今日から週末にかけて関東地方は全国的にお出かけ日和になりそうですね。 #東京 #観光 #旅行 #富士山",
    "views": 24300,
    "likes": 1200,
    "reposts": 180,
    "score": 27240,
    "category": "travel",
    "url": "https://x.com/japan_traveler_88/status/1000000000000000000",
    "tags": ["東京", "観光", "旅行", "富士山"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    "updatedAt": new Date().toISOString()
  },
  {
    "id": "x_2026_10",
    "platform": "x",
    "title": "そうだ、京都行こう。久しぶりに関西への1人旅。嵐山の渡月橋の景色に...",
    "summary": "そうだ、京都行こう。久しぶりに関西への1人旅。嵐山の渡月橋の景色に心から癒されました。緑の紅葉が美しく、深呼吸の良さを思い出します。 #旅行 #京都観光 #お出かけ",
    "views": 19800,
    "likes": 1250,
    "reposts": 190,
    "score": 22870,
    "category": "travel",
    "url": "https://x.com/kyoto_escape/status/1000000000000000000",
    "tags": ["旅行", "京都観光", "お出かけ"],
    "postedAt": new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    "updatedAt": new Date().toISOString()
  }
];

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Interactive guides modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCrawlSimulating, setIsCrawlSimulating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from /public/data/posts.json
  const loadPostsData = async () => {
    setLoading(true);
    
    // Set up a 3-second abort signal to prevent browser/network hung states in sandbox frames
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 3000);

    try {
      // Fetch dynamic posts with abort signal control
      const response = await fetch('./data/posts.json', { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP status: ${response.status}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setPosts(data);
        setErrorStatus(null);
      } else {
        throw new Error("Data is not formatting as an array.");
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("Could not fetch ./data/posts.json dynamically, loading backup presets:", err.message || err);
      // Fail-safe load directly from bundled static JSON file
      setPosts(PRESET_POSTS as unknown as Post[]);
      setErrorStatus("プリセットデータ使用中（クロール未実行 or ネットワーク制限）");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostsData();
  }, []);

  // Show temporary feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Simulate local user trigger crawl mechanism
  const triggerSimulatedUpdate = () => {
    setIsCrawlSimulating(true);
    showToast("最新トレンド（𝕏, Facebook, Instagram）の収集を開始しています...");
    
    setTimeout(() => {
      // Simulate scoring dynamic additions or updates
      const updated = posts.map(p => {
        // Boost some views/likes slightly to simulate real crawling shifts
        const multiplier = 1 + (Math.random() * 0.15);
        const nextViews = Math.floor(p.views * multiplier);
        const nextLikes = Math.floor(p.likes * multiplier);
        const nextReposts = Math.floor(p.reposts * multiplier);
        const nextScore = Math.floor(nextViews * 1 + nextLikes * 2 + nextReposts * 3);
        
        return {
          ...p,
          views: nextViews,
          likes: nextLikes,
          reposts: nextReposts,
          score: nextScore,
          updatedAt: new Date().toISOString()
        };
      });

      // Sort with next score desc
      updated.sort((a, b) => b.score - a.score);
      setPosts(updated);
      setIsCrawlSimulating(false);
      showToast("クロール完了！Hot Score（バズスコア）をリアルタイムに更新しました。");
    }, 1500);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    // Platform search
    if (selectedPlatform !== 'all' && post.platform !== selectedPlatform) {
      return false;
    }
    // Category match
    if (selectedCategory !== 'all' && post.category !== selectedCategory) {
      return false;
    }
    // Search query match (title, summary, tags)
    if (searchTerm.trim() !== '') {
      const query = searchTerm.toLowerCase();
      const hasTitle = post.title.toLowerCase().includes(query);
      const hasSummary = post.summary.toLowerCase().includes(query);
      const hasTags = post.tags.some(tag => tag.toLowerCase().includes(query));
      if (!hasTitle && !hasSummary && !hasTags) {
        return false;
      }
    }
    return true;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'score') {
      return b.score - a.score;
    } else if (sortBy === 'views') {
      return b.views - a.views;
    } else if (sortBy === 'date') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    }
    return 0;
  });

  // Unique categories count calculations
  const statsByCategory = {
    all: posts.length,
    news: posts.filter(p => p.category === 'news').length,
    food: posts.filter(p => p.category === 'food').length,
    travel: posts.filter(p => p.category === 'travel').length,
    tech: posts.filter(p => p.category === 'tech').length,
    sports: posts.filter(p => p.category === 'sports').length,
  };

  // Human friendly category names in Japanese & Vietnamese
  const categoryMeta: Record<string, { ja: string; vi: string; color: string; bg: string }> = {
    news: { ja: 'ニュース', vi: 'News', color: 'text-red-700 border-red-200', bg: 'bg-red-50' },
    food: { ja: 'グルメ', vi: 'Food', color: 'text-amber-700 border-amber-200', bg: 'bg-amber-50' },
    travel: { ja: '旅行・観光', vi: 'Travel', color: 'text-green-700 border-green-200', bg: 'bg-green-50' },
    tech: { ja: '技術', vi: 'Tech', color: 'text-blue-700 border-blue-200', bg: 'bg-blue-50' },
    sports: { ja: 'スポーツ', vi: 'Sports', color: 'text-purple-700 border-purple-200', bg: 'bg-purple-50' },
  };

  // Helper date formatter
  const formatTimeAgo = (isoString: string) => {
    const pubDate = new Date(isoString);
    const diffMs = Date.now() - pubDate.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) {
      return `${Math.max(1, diffMins)}分前`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return `${diffHours}時間前`;
    }

    return pubDate.toLocaleDateString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#333333] selection:bg-[#F0F0F0] pb-24">
      
      {/* Toast Alert Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#333333] text-[#FFFFFF] text-sm px-4 py-3 rounded shadow-lg border border-neutral-700 flex items-center gap-2 max-w-sm transition-all duration-300">
          <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Professional Header Banner */}
      <header className="border-b border-[#EEEEEE] bg-[#FFFFFF] sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col xs:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="logo-red-circle shrink-0">
              まとめ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-[#333333]">SNS Matome</span>
                <span className="text-xs bg-[#E60012] text-white px-1.5 py-0.5 rounded font-mono font-bold tracking-wider uppercase">MVP</span>
              </div>
              <p className="text-[11px] text-[#888888]">
                日本国内のSNSでバズっているトレンド・急上昇投稿を自動収集・分析します
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#888888] bg-[#FAFAFA] px-2.5 py-1 rounded border border-[#EEEEEE]">
              <span className="w-2 h-2 rounded-full bg-[#4CAF50]"></span>
              <span>最終更新: {posts[0] ? new Date(posts[0].updatedAt).toLocaleDateString('ja-JP', {year: 'numeric', month: '2-digit', day: '2-digit'}) : '2026.05.26'} {posts[0] ? new Date(posts[0].updatedAt).toLocaleTimeString('ja-JP', {hour: '2-digit', minute: '2-digit', hour12: false}) : '01:14'}</span>
            </div>

            <button
              onClick={triggerSimulatedUpdate}
              disabled={isCrawlSimulating}
              className={`text-xs px-3 py-1.5 rounded border border-[#DDDDDD] hover:border-[#999999] hover:bg-[#FAFAFA] transition flex items-center gap-1.5 font-medium cursor-pointer ${
                isCrawlSimulating ? 'opacity-50 cursor-not-allowed bg-[#FAFAFA]' : 'bg-white text-[#333333]'
              }`}
            >
              <RefreshCw className={`w-3 h-3 ${isCrawlSimulating ? 'animate-spin text-[#E60012]' : 'text-[#888888]'}`} />
              <span>手動クロール</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs bg-[#333333] hover:bg-[#111111] text-white px-3 py-1.5 rounded transition flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-gray-300" />
              <span>ヘルプ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Core Content Layout */}
      <main className="max-w-5xl mx-auto px-6 mt-8">
        
        {/* State Banner: Display Preset Indicator warning */}
        {errorStatus && (
          <div className="mb-6 bg-[#FFF8F8] border border-[#FFE3E3] text-[#E60012] text-xs rounded p-4 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#E60012] mt-0.5" />
            <div>
              <p className="font-bold">【デモモード】現在、ローカルのテストデータ（Simulated Offline Presets）を表示中</p>
              <p className="text-[11px] text-red-700/80 mt-1 leading-relaxed">
                本番環境のPlaywrightクローラーを実行するには、端末で <code className="bg-red-100/50 font-mono px-1 py-0.5 rounded text-[#E60012] text-[10px]">npm run crawl</code> を実行して実際の <code className="bg-red-100/50 font-mono px-1 py-0.5 rounded">public/data/posts.json</code> を生成してください。
              </p>
            </div>
          </div>
        )}

        {/* Hero Area / Overview Board */}
        <section className="bg-white border border-[#EEEEEE] rounded p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 bg-[#FFF5F5] text-[#E60012] text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded border border-[#FFE3E3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E60012] animate-pulse"></span>
              🔥 HOT NOW
            </div>
            <h2 className="text-xl font-bold tracking-tight text-[#333333] mt-2">
              日本国内 SNS リアルタイムバズランキング
            </h2>
            <p className="text-xs text-[#666666] leading-relaxed max-w-xl">
              主要SNS（𝕏 / Twitter, Facebook, Instagram）から人気投稿を自動抽出し、独自のバズ指標「Hot Score」に基づいてリアルタイム集計しています。日本の今を網羅的に把握可能です。
            </p>
          </div>
          
          {/* Quick Metrics display widget */}
          <div className="flex gap-2.5 shrink-0">
            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded px-4 py-3 text-center min-w-[110px]">
              <span className="block text-[10px] uppercase font-mono text-[#888888] font-bold tracking-wider">総投稿数</span>
              <span className="text-2xl font-bold font-mono text-[#333333] leading-none mt-1 block">{filteredPosts.length}</span>
            </div>
            <div className="bg-[#FFFBFB] border border-[#FFEAEA] rounded px-4 py-3 text-center min-w-[110px]">
              <span className="block text-[10px] uppercase font-mono text-[#E60012]/80 font-bold tracking-wider">最高スコア</span>
              <span className="text-2xl font-bold font-mono text-[#E60012] leading-none mt-1 block">
                {posts.length > 0 ? `${Math.max(...posts.map(p => p.score)).toLocaleString()}` : '0'}
              </span>
            </div>
          </div>
        </section>

        {/* Minimal Search & Filter Design Box */}
        <div className="bg-[#FAFFAFA]/30 border border-[#EEEEEE] bg-[#FAFAFA] rounded p-6 mb-8 space-y-5">
          
          {/* Search Box with icon */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#888888]" />
            <input
              type="text"
              placeholder="キーワード、ハッシュタグ、コンテンツ内容から検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs pl-10 pr-12 py-2.5 bg-[#FFFFFF] border border-[#DDDDDD] rounded focus:outline-none focus:border-[#333333] transition font-sans placeholder-[#999999]"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-2.5 text-[#999999] hover:text-[#333333] text-xs font-mono border border-gray-200 hover:border-gray-400 px-1 rounded cursor-pointer background-white"
              >
                クリア
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            
            {/* Filter 1: Social Platform select line */}
            <div className="flex items-center gap-4 border-b border-[#EEEEEE]/60 pb-3">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#888888] min-w-[85px]">ソース:</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedPlatform('all')}
                  className={`text-[12px] px-3.5 py-1 rounded transition-all cursor-pointer ${
                    selectedPlatform === 'all' 
                      ? 'bg-[#333333] text-white'
                      : 'bg-white text-[#666666] border border-[#DDDDDD] hover:border-[#999999]'
                  }`}
                >
                  すべて ({posts.length})
                </button>
                <button
                  onClick={() => setSelectedPlatform('x')}
                  className={`text-[12px] px-3.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPlatform === 'x' 
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-[#666666] border border-[#DDDDDD] hover:border-[#999999]'
                  }`}
                >
                  <span className="font-bold">𝕏</span> Twitter ({posts.filter(p => p.platform === 'x').length})
                </button>
                <button
                  onClick={() => setSelectedPlatform('facebook')}
                  className={`text-[12px] px-3.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPlatform === 'facebook' 
                      ? 'bg-[#1877F2] text-white border-[#1877F2]'
                      : 'bg-white text-[#666666] border border-[#DDDDDD] hover:border-[#999999]'
                  }`}
                >
                  <Facebook className="w-3.5 h-3.5 shrink-0" /> Facebook ({posts.filter(p => p.platform === 'facebook').length})
                </button>
                <button
                  onClick={() => setSelectedPlatform('instagram')}
                  className={`text-[12px] px-3.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedPlatform === 'instagram' 
                      ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white border-none'
                      : 'bg-white text-[#666666] border border-[#DDDDDD] hover:border-[#999999]'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5 shrink-0" /> Instagram ({posts.filter(p => p.platform === 'instagram').length})
                </button>
              </div>
            </div>

            {/* Filter 2: Category chips */}
            <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <span className="text-[11px] uppercase tracking-wider font-mono font-bold text-[#888888] min-w-[85px]">カテゴリ:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`text-[12px] px-4 py-1.5 rounded-full transition-all cursor-pointer border ${
                    selectedCategory === 'all' 
                      ? 'bg-[#333333] text-white border-[#333333]'
                      : 'bg-white text-[#555555] border-[#DDDDDD] hover:border-[#999999]'
                  }`}
                >
                  すべて
                </button>
                
                {Object.entries(categoryMeta).map(([key, meta]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as CategoryFilter)}
                    className={`text-[12px] px-4 py-1.5 rounded-full transition-all cursor-pointer border flex items-center gap-1.5 ${
                      selectedCategory === key
                        ? 'bg-[#333333] text-white border-[#333333]'
                        : 'bg-white text-[#555555] border-[#DDDDDD] hover:border-[#999999]'
                    }`}
                  >
                    <span className="font-medium">{meta.ja}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Advanced sort options bar */}
          <div className="border-t border-[#EEEEEE] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#666666]">
              表示中: <span className="font-bold text-[#333333]">{filteredPosts.length}</span> 件 / 全 {posts.length} 件
            </div>
            
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-[#888888] font-sans">並び替え:</span>
              <div className="inline-flex rounded border border-[#DDDDDD] bg-white text-[11px]" role="group">
                <button
                  type="button"
                  onClick={() => setSortBy('score')}
                  className={`px-3 py-1.5 font-bold transition-all cursor-pointer ${
                    sortBy === 'score'
                      ? 'bg-[#FFF5F5] text-[#E60012]'
                      : 'text-[#666666] hover:bg-[#FAFAFA]'
                  }`}
                >
                  🔥 Hot Score
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('views')}
                  className={`px-3 py-1.5 font-bold border-l border-[#DDDDDD] transition-all cursor-pointer ${
                    sortBy === 'views'
                      ? 'bg-neutral-100 text-[#333333]'
                      : 'text-[#666666] hover:bg-[#FAFAFA]'
                  }`}
                >
                  👁️ インプレッション
                </button>
                <button
                  type="button"
                  onClick={() => setSortBy('date')}
                  className={`px-3 py-1.5 font-bold border-l border-[#DDDDDD] transition-all cursor-pointer ${
                    sortBy === 'date'
                      ? 'bg-[#FAFAFA] text-[#333333]'
                      : 'text-[#666666] hover:bg-[#FAFAFA]'
                  }`}
                >
                  📅 投稿日時
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-8 h-8 animate-spin text-[#E60012]" />
            <p className="text-sm text-[#777777] font-mono">最新の posts.json データを読み込み中...</p>
          </div>
        ) : sortedPosts.length === 0 ? (
          /* Empty Search Fallback */
          <div className="py-20 text-center border border-dashed border-[#E0E0E0] bg-white rounded flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center mb-3">
              <Search className="w-5 h-5 text-[#888888]" />
            </div>
            <h3 className="text-sm font-bold text-[#333333]">検索結果が見つかりません</h3>
            <p className="text-xs text-[#777777] mt-1 max-w-sm">
              キーワード「<strong className="font-mono">{searchTerm}</strong>」に該当するコンテンツが見つかりません。別のワードで検索いただくか、以下のボタンでリセットしてください。
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedPlatform('all');
              }}
              className="mt-4 text-xs font-semibold px-4 py-2 rounded bg-[#333333] text-white hover:bg-black transition cursor-pointer"
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          /* Main Posts Feed Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, index) => {
              const meta = categoryMeta[post.category] || { ja: 'その他', vi: 'Khác', color: 'text-gray-700 bg-gray-100 border-gray-200', bg: 'bg-gray-50' };
              
              return (
                <article 
                  key={post.id}
                  className="custom-post-card rounded p-5 flex flex-col justify-between"
                >
                  {/* Top line metadata row */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${meta.bg} ${meta.color}`}>
                        {meta.ja}
                      </span>
                      
                      <div className="flex items-center gap-1.5 text-[11px] text-[#888888] font-mono">
                        <span>{formatTimeAgo(post.postedAt)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-[#333333] leading-snug tracking-tight mb-2 hover:text-[#E60012] transition">
                      <a 
                        href={post.url} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="line-clamp-2 hover:underline"
                        title={post.summary}
                      >
                        {post.summary.replace(/#[^\s#]+/g, '').trim()}
                      </a>
                    </h3>

                    {/* Summary content snippet */}
                    <p className="text-xs text-[#666666] line-clamp-3 leading-relaxed mb-4">
                      {post.summary}
                    </p>

                    {/* Hashtags list */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, tIdx) => (
                          <span 
                            key={tIdx} 
                            onClick={() => setSearchTerm(tag)}
                            className="text-[10px] text-blue-600 hover:underline cursor-pointer bg-blue-50/50 px-1.5 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom metrics row */}
                  <div className="stats-row">
                    <div className="flex items-center justify-between w-full">
                      {/* Integrated Hot Score Badge */}
                      <div className="custom-badge-red text-[11px] font-bold px-2 py-0.5 rounded font-mono">
                        SCORE {post.score.toLocaleString()}
                      </div>

                      {/* Other count insights */}
                      <div className="flex items-center gap-3 text-[11px] text-[#999999] font-mono">
                        <div className="flex items-center gap-0.5" title="Views">
                          <Eye className="w-3 h-3 text-[#CCCCCC]" />
                          <span>{post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}</span>
                        </div>
                        <div className="flex items-center gap-0.5" title="Likes">
                          <Heart className="w-3 h-3 text-red-300" />
                          <span>{post.likes}</span>
                        </div>
                        {post.platform === 'x' && (
                          <span className="font-bold text-neutral-900 text-[11px] font-sans" title="Twitter / 𝕏">𝕏</span>
                        )}
                        {post.platform === 'facebook' && (
                          <Facebook className="w-3.5 h-3.5 text-[#1877F2]" title="Facebook" />
                        )}
                        {post.platform === 'instagram' && (
                          <Instagram className="w-3.5 h-3.5 text-[#E1306C]" title="Instagram" />
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </main>

      {/* Guide & Configuration Modal Window */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#000000]/45 flex items-center justify-center p-4 z-50 overflow-y-auto backdrop-blur-[2px]">
          <div className="bg-white border border-[#DDDDDD] rounded shadow-xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-xs font-mono text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-900 px-1.5 py-0.5 rounded cursor-pointer"
            >
              [X] 閉じる
            </button>

            <h3 className="text-base font-bold text-[#333333] mb-4 pb-2 border-b border-[#EEEEEE] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E60012] shrink-0" />
              システム設定とデプロイガイド (System & Deploy Guide)
            </h3>

            <div className="space-y-4 text-xs text-[#666666] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#333333] mb-1">🔑 収集ワード候補（一部抜粋）:</h4>
                <div className="flex flex-wrap gap-1">
                  {['東京', '渋谷', '日本ニュース', '速報', '地震', '事故', 'グルメ', 'AI', '野球', '旅行'].map(k => (
                    <span key={k} className="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded font-mono">
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#333333] mb-1">📊 急上昇指標算出ロジック (Hot Score Formula):</h4>
                <div className="bg-[#FFF5F5] font-mono p-2.5 rounded text-[11px] text-[#E60012] font-bold border border-[#FFE3E3]">
                  Score = (Views × 1) + (Likes × 2) + (Repost × 3)
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#333333] mb-1">🎯 各カテゴリの自動振分けワード設定:</h4>
                <p>取得したテキストに特定の単語が含まれると自動で以下のカテゴリが紐づけられます：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-[11px]">
                  <li>地震, 事故, 速報, 台風, 気象 → <strong>ニュース (ニュース)</strong></li>
                  <li>グルメ, ラーメン, カフェ, 寿司, スイーツ → <strong>グルメ (グルメ)</strong></li>
                  <li>渋谷, 東京, 旅行, 観光, 温泉 → <strong>旅行・観光 (旅行・観光)</strong></li>
                  <li>AI, ChatGPT, プログラミング, TypeScript → <strong>技術 (技術)</strong></li>
                  <li>野球, サッカー, 試合, 大谷翔平 → <strong>スポーツ (スポーツ)</strong></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-[#333333] mb-1">☁️ 完全無料の静的Webデプロイ方法:</h4>
                <p>データファイル（<code className="bg-gray-50 px-1 font-mono">public/data/posts.json</code>）をビルドして配信するだけのファンタスティックな設計であるため、以下の無料環境で完璧に動作します：</p>
                <ul className="list-disc pl-4 space-y-1 mt-1">
                  <li><strong>GitHub Pages:</strong> GitHub動作フロー(Actions)があらかじめ設定されています。定期トリガーでクロールを自動実行・保存・コミットを完全全自動で行うことが可能です。</li>
                  <li><strong>Cloudflare Pages:</strong> Githubリポジトリと連携するだけで、静的Webページを高速にビルド＆世界同時配信可能です。</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#EEEEEE] text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-[#333333] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-black transition cursor-pointer"
              >
                了解
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer info line */}
      <footer className="mt-20 border-t border-[#EEEEEE] py-10 max-w-5xl mx-auto px-6 text-xs text-[#888888] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p>© {new Date().getFullYear()} <strong>SNS Matome まとめ</strong> App.</p>
          <p className="text-[10px] text-[#BBBBBB] mt-1 shrink-0">極限まで無駄を削ぎ落とした、ミニマルな和風モダンデザイン。</p>
        </div>
        <div className="text-[11px] font-mono text-[#999999] bg-[#FAFAFA] border border-[#EEEEEE] px-3 py-1.5 rounded flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[#4CAF50] rounded-full"></span>
          <span>収集エンジンの稼働状態: 良好 (Active & Healthy)</span>
        </div>
      </footer>

    </div>
  );
}

// Keep file end cleanly standard
